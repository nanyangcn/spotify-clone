'use client';

import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types/types';

interface SearchContentProps {
  songs: Song[]
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="relative flex w-full items-center gap-x-0 hover:bg-neutral-800/50"
        >
          <div className="flex-1">
            <MediaItem
              song={song}
              className="w-full hover:bg-inherit"
              onClick={(id) => onPlay(id)}
            />
          </div>
          <div className="absolute right-4 top-5">
            <LikeButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
