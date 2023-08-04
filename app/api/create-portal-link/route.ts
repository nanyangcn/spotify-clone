import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';
import stripe from '@/libs/stripe';
import { getUrl } from '@/libs/helpers';

const POST = async () => {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Failed to get user');
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || '',
    });

    if (!customer) {
      throw new Error('Failed to create customer');
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getUrl()}/account`,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { POST };
