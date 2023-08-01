'use client';

import SongItem from '@/components/SongItem';
import { Song } from '@/types/types';

interface PageContentProps {
  songs: Song[];
}

const PageContent = ({ songs }: PageContentProps) => {
  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        There are no songs.
      </div>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-4
    sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8"
    >
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={() => {}}
          song={song}
        />
      ))}
    </div>
  );
};

export default PageContent;
