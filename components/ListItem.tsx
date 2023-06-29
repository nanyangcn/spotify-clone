'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    // Add authentication before push
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative flex items-center gap-x-4 overflow-hidden
      rounded-md bg-neutral-100/20 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          className="object-cover "
          fill
          src={image}
          alt="Image"
        />
      </div>
      <p className="truncate py-5 font-medium">
        {name}
      </p>
      <div
        className="absolute right-5 flex items-center justify-center
        rounded-full bg-green-500 p-4 opacity-90 drop-shadow-md transition
        hover:scale-110 group-hover:opacity-100"
      >
        <FaPlay className="translate-x-[1.5px] text-black" />
      </div>
    </button>
  );
};

export default ListItem;
