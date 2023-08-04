import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Song } from '@/types/types';

const useGetSongById = (id?: number | string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSong = async () => {
      const res = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (res.error) {
        setIsLoading(false);
        return toast.error(res.error.message);
      }

      setSong(res.data as Song);
      return setIsLoading(false);
    };

    fetchSong().then(() => {}).catch(() => {});
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song,
  }), [isLoading, song]);
};

export default useGetSongById;
