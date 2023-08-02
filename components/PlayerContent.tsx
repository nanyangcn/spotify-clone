'use client';

import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import {
  ImVolumeHigh, ImVolumeLow, ImVolumeMute2, ImVolumeMedium,
} from 'react-icons/im';

import { Song } from '@/types/types';
import usePlayer from '@/hooks/usePlayer';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import VolumeSlider from './VolumeSlider';

interface PlayerContentProps {
  volume: number;
  setVolume: (volume: number) => void;
  song: Song;
  songUrl: string;
}

const PlayerContent = ({
  volume, setVolume, song, songUrl,
}: PlayerContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = usePlayer();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  let VolumeIcon = null;
  if (volume < 1) {
    VolumeIcon = ImVolumeMute2;
  } else if (volume < 33) {
    VolumeIcon = ImVolumeLow;
  } else if (volume < 66) {
    VolumeIcon = ImVolumeMedium;
  } else {
    VolumeIcon = ImVolumeHigh;
  }

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      player.setId(player.ids[0] as number);
    } else {
      player.setId(nextSong);
    }
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    const songListLen = player.ids.length;
    if (!previousSong) {
      player.setId(player.ids[songListLen - 1] as number);
    } else {
      player.setId(previousSong);
    }
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume / 100,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    setVolume(volume < 1 ? 50 : 0);
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex items-center gap-x-4">
        <MediaItem song={song} className="cursor-default hover:bg-inherit" />
        <LikeButton songId={song.id} />
      </div>
      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon size={30} className="text-black" onClick={handlePlay} />
        </div>
      </div>
      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <AiFillStepBackward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayPrevious}
        />
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon size={30} className="text-black" onClick={handlePlay} />
        </div>
        <AiFillStepForward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayNext}
        />
      </div>
      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon
            className="scale-150 cursor-pointer"
            onClick={toggleMute}
          />
          <VolumeSlider
            volume={volume}
            setVolume={setVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
