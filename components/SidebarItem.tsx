import { IconType } from 'react-icons';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

function SidebarItem({
  icon: Icon, label, active, href,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `inline-flex h-auto w-full cursor-pointer flex-row items-center
        gap-x-4 py-1 font-medium text-neutral-400 transition
        hover:text-white`,
        active && 'text-white',
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">
        {label}
      </p>
    </Link>
  );
}

export default SidebarItem;
