'use client';

import React, { useEffect, useState } from 'react';
import type { Howl } from 'howler';
import { twMerge } from 'tailwind-merge';

interface PlayerProgressBarProps {
  duration: number | null;
  sound: Howl | null;
  showTime?: boolean;
  className?: string;
}
const PlayerProgressBar = ({
  duration,
  sound,
  showTime = false,
  className = '',
}: PlayerProgressBarProps) => {
  const [currTime, setCurrTime] = useState(0);
  const [isProgressBarPressed, setIsProgressBarPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && !isProgressBarPressed) {
        setCurrTime(Math.round(sound.seek()));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [sound, isProgressBarPressed]);

  const songDurationInSeconds = Math.round((duration || 0) / 1000.0);
  const songTimeLeftInSeconds = songDurationInSeconds - currTime;

  const secondsToMinAndSec = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const handleProgressBarPressDown = () => {
    setIsProgressBarPressed(true);

    setTimeout(() => {
      setIsProgressBarPressed(false);
    }, 5000);
  };

  const handleProgressBarPressUp = (value: number) => {
    sound?.seek(Number(value));
    setIsProgressBarPressed(false);
  };

  interface TypeStyle extends React.CSSProperties {
    '--track-color': string,
    '--progress-color': string,
    '--progress-value': string,
  }
  const inputStyle: TypeStyle = {
    '--track-color': '#4d4d4d',
    '--progress-color': '#FFFFFF',
    '--progress-value': `${(100 * currTime) / songDurationInSeconds}%`,
  };

  return (
    <div
      className={twMerge(
        'flex items-center gap-x-1',
        className,
      )}
    >
      {showTime && (
      <p className="px-1 text-xs text-neutral-400">
        {secondsToMinAndSec(currTime)}
      </p>
      )}
      <div className="group relative flex w-full items-center">
        <input
          className="Slider w-full cursor-pointer appearance-none bg-transparent focus:outline-none"
          style={inputStyle}
          type="range"
          min={0}
          max={songDurationInSeconds}
          value={currTime}
          onMouseDown={handleProgressBarPressDown}
          onMouseUp={(e) => handleProgressBarPressUp(Number(e.currentTarget.value))}
          onChange={(e) => setCurrTime(Number(e.target.value))}
          onTouchStart={handleProgressBarPressDown}
          onTouchEnd={(e) => handleProgressBarPressUp(Number(e.currentTarget.value))}
        />
      </div>
      {showTime && (
      <p className="px-1 text-xs text-neutral-400">
        {secondsToMinAndSec(songTimeLeftInSeconds)}
      </p>
      )}
    </div>
  );
};

export default PlayerProgressBar;
