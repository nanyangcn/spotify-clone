'use client';

import Image from 'next/image';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types/types';
import { twMerge } from 'tailwind-merge';

interface MediaItemProps {
  onClick?: (id: number) => void;
  song: Song;
  className?: string;
}

const MediaItem = ({ onClick, song, className = '' }: MediaItemProps) => {
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
    // TODO: Default turn on player
  };
  return (
    <div
      // onClick={handleClick}
      className={twMerge(
        'flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50',
        className,
      )}
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          src={imageUrl || '/images/liked.png'}
          fill
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">
          {song.title}
        </p>
        <p className="truncate text-sm text-neutral-400">
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
