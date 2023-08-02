'use client';

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeSlider = ({ volume, setVolume }: VolumeSliderProps) => {
  const progressBarStyle = {
    width: `${(volume * (100 - 12)) / 100}%`,
  };

  return (
    <div className="group relative flex items-center">
      <div
        className="pointer-events-none absolute top-[50%] h-1 origin-left translate-y-[-2px] scale-x-[1.136]
        rounded-full bg-white group-hover:scale-x-100 group-hover:bg-[#1ED760]"
        style={progressBarStyle}
      />
      <input
        className="VolumeSlider h-10 w-[100px] cursor-pointer appearance-none bg-transparent focus:outline-none"
        type="range"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
};

export default VolumeSlider;
