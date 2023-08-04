import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';
import stripe from '@/libs/stripe';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';
import { getUrl } from '@/libs/helpers';

const POST = async (req: Request) => {
  const { price, quantity = 1, metadata = {} } = await req.json() as {
    price: { id: string };
    quantity: number;
    metadata: Record<string, string>;
  };

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const { data: { user } } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    });

    const session = await stripe.checkout.sessions.create({
      customer,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      success_url: `${getUrl()}/account`,
      cancel_url: `${getUrl()}/`,
    });

    return NextResponse.json({
      sessionId: session.id,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { POST };
