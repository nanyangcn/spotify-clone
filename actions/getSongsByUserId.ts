import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/types/supabase';
import { Song } from '@/types/types';

const getSongsByUserId = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: sessionData,
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error(sessionError.message);
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data as Song[] || [];
};

export default getSongsByUserId;
