'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useUser } from '@/hooks/useUser';
import { Song } from '@/types/types';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

interface LikedContentProps {
  songs: Song[];
}

const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No liked songs.
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
            <MediaItem song={song} className="hover:bg-inherit" />
          </div>
          <div className="absolute right-4 top-5">
            <LikeButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
