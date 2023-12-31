'use Client';

import { FaPlay } from 'react-icons/fa';
import Image from 'next/image';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types/types';

interface SongItemProps {
  song: Song;
  onClick: (id: string | number) => void;
}

const SongItem = ({ song, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      onKeyDown={() => onClick(song.id)}
      role="button"
      tabIndex={0}
      className="group relative flex cursor-pointer flex-col items-center justify-center
      gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          fill
          sizes="300px"
          alt="image"
          priority
        />
        <button
          type="button"
          className="absolute bottom-0 right-2 flex items-center justify-center
          rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition duration-300
          group-hover:-translate-y-2 group-hover:opacity-100"
          onClick={() => onClick(song.id)}
        >
          <FaPlay className="translate-x-[1.5px] text-black" />
        </button>
      </div>
      <div className="flex w-full flex-col items-start gap-y-2 px-2 pb-2 pt-4">
        <p className="w-full truncate font-semibold">
          {song.title}
        </p>
        <p className="line-clamp-2 h-[38px] w-full text-sm text-neutral-400">
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
