'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();

  const onClick = () => {
    if (!isLoading && !user) {
      return authModal.onOpen();
    }
    return router.push(href);
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
          sizes="100px"
          src={image}
          alt="Image"
        />
      </div>
      <p className="truncate py-5 font-medium">
        {name}
      </p>
    </button>
  );
};

export default ListItem;
