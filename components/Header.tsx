'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Button from '@/components/Button';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

function Header({ children, className = '' }: HeaderProps) {
  const router = useRouter();

  const handlelogout = () => {
    console.log('logout');
  };

  return (
    <div className={twMerge(
      'h-fit bg-gradient-to-b from-emerald-800 p-6',
      className,
    )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onClick={() => router.back()}
            type="button"
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            type="button"
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            onClick={() => { }}
            type="button"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => { }}
            type="button"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {true
            ? (
              <>
                <div>
                  <Button
                    onClick={() => { }}
                    className="bg-transparent font-medium text-neutral-300"
                  >
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => { }}
                    className="bg-white px-6 py-2"
                  >
                    Login
                  </Button>
                </div>
              </>
            )
            : (
              <>
                <div>
                  <Button
                    onClick={() => { }}
                    className="bg-transparent font-medium text-neutral-300"
                  >
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => { }}
                    className="bg-white px-6 py-2"
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
