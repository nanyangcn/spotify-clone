'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types/types';

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
    return null;
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        'flex cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50',
        className,
      )}
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md hover:cursor-pointer">
        <Image
          src={imageUrl || '/images/liked.png'}
          fill
          sizes="100px"
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-y-[2px] overflow-hidden">
        <p className="truncate text-lg font-semibold text-white hover:cursor-pointer hover:underline">
          {song.title}
        </p>
        <p className="truncate text-sm text-neutral-400 hover:cursor-pointer hover:underline">
          {song.author}
        </p>
      </div>
    </button>
  );
};

export default MediaItem;
