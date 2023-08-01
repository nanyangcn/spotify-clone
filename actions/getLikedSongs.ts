import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/types/supabase';
import { Song } from '@/types/types';

const getLikedSongs = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data: { session } } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs as Song }));
};
export default getLikedSongs;
