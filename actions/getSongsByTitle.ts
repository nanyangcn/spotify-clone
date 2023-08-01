import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/types/supabase';
import { Song } from '@/types/types';

const getSongs = async (title: string) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  if (title === '') {
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Song[] || [];
};
export default getSongs;
