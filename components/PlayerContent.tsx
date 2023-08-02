'use client';

import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import {
  ImVolumeHigh, ImVolumeLow, ImVolumeMute2, ImVolumeMedium,
} from 'react-icons/im';
import { Howl } from 'howler';

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
  const [currTime, setCurrTime] = useState(0);

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

  const [play, exposedData] = useSound(songUrl, {
    volume: volume / 100,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    format: ['mp3'],
  });

  const { pause, sound, duration } = exposedData as {
    pause: (id?: string | undefined) => void,
    sound: Howl | null,
    duration: number | null;
  };
  const songDurationInSeconds = Math.round((duration || 0) / 1000.0);
  const songTimeLeftInSeconds = songDurationInSeconds - currTime;

  const secondsToMinAndSec = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setCurrTime(Math.round(sound.seek()));
      }
    }, 100);
    return () => clearInterval(interval);
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

  const progressBarStyle = {
    md: {
    // 350 is the width of the progressbar in px
      width: `${((currTime / songDurationInSeconds) * (100 - 12 / (350 / 100)))}%`,
    },
    sm: {
    // 100 is the width of the progressbar in px
      width: `${((currTime / songDurationInSeconds) * (100 - 12 / (100 / 100)))}%`,
    },
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex items-center gap-x-4">
        <MediaItem song={song} className="cursor-default hover:bg-inherit" />
        <LikeButton songId={song.id} />
      </div>
      {/* <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon size={30} className="text-black" onClick={handlePlay} />
        </div>
      </div> */}
      <div className="flex flex-row-reverse items-center justify-between gap-x-6 gap-y-2 md:flex-col">
        <div className="flex h-full w-full max-w-[722px] items-center justify-center gap-x-6">
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
        <div className="flex items-center gap-x-1">
          <p className="px-1 text-xs text-neutral-400">
            {secondsToMinAndSec(currTime)}
          </p>
          <div className="group relative flex items-center">
            <div
              className="pointer-events-none invisible absolute top-[50%] h-1 origin-left
              translate-y-[-2px] scale-x-[calc(350/(350-12))] rounded-full bg-white
              group-hover:scale-x-100 group-hover:bg-[#1ED760] md:visible"
              style={progressBarStyle.md}
            />
            <div
              className="pointer-events-none visible absolute top-[50%] h-1 origin-left
              translate-y-[-2px] scale-x-[calc(100/(100-12))] rounded-full bg-white
              group-hover:scale-x-100 group-hover:bg-[#1ED760] md:invisible"
              style={progressBarStyle.sm}
            />
            <input
              className="Slider w-[100px] cursor-pointer appearance-none bg-transparent
              focus:outline-none md:w-[350px]"
              type="range"
              min={0}
              max={songDurationInSeconds}
              value={currTime}
              onChange={(e) => sound?.seek(Number(e.target.value))}
            />
          </div>
          <p className="px-1 text-xs text-neutral-400">
            {secondsToMinAndSec(songTimeLeftInSeconds)}
          </p>
        </div>
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
