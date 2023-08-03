import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { toErrWithMsg } from '@/utils/errParser';
import stripe from '@/libs/stripe';
import { manageSubscriptionsStatusChange, upsertPriceRecord, upsertProductRecord } from '@/libs/supabaseAdmin';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

const POST = async (req: Request) => {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return null;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const { message: errMsg } = toErrWithMsg(err);
    console.log(`Error message: ${(errMsg)}`);
    return new NextResponse(`Webhook Error: ${errMsg}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated': {
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        }
        case 'price.created':
        case 'price.updated': {
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        }
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionsStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created',
          );
          break;
        }
        case 'checkout.session.completed': {
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            await manageSubscriptionsStatusChange(
              checkoutSession.subscription as string,
              checkoutSession.customer as string,
              true,
            );
          }
          break;
        }
        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      const { message: errMsg } = toErrWithMsg(err);
      console.log(`Error message: ${(errMsg)}`);
      return new NextResponse(`Webhook Error: ${errMsg}`, { status: 400 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  POST,
};
