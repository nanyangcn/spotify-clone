'use client';

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeSlider = ({ volume, setVolume }: VolumeSliderProps) => {
  interface TypeStyle extends React.CSSProperties {
    '--track-color': string,
    '--progress-color': string,
    '--progress-value': string,
  }
  const inputStyle: TypeStyle = {
    '--track-color': '#4d4d4d',
    '--progress-color': '#FFFFFF',
    '--progress-value': `${volume}%`,
  };

  return (
    <div className="group relative flex items-center">
      <input
        className="Slider h-10 w-[100px] cursor-pointer appearance-none bg-transparent focus:outline-none"
        style={inputStyle}
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
