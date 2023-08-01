import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/types/supabase';
import { Song } from '@/types/types';

const getSongs = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Song[] || [];
};
export default getSongs;
