import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/types/supabase';
import { ProductWithPrice } from '@/types/types';

const getActiveProductsWithPrices = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    throw new Error(error.message);
  }

  return data as ProductWithPrice[];
};
export default getActiveProductsWithPrices;
