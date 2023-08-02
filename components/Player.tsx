'use client';

import { useState } from 'react';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';

const Player = () => {
  const [volume, setVolume] = useState(50);

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 mb-2 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  );
};

export default Player;
