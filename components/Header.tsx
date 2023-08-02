'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import Button from '@/components/Button';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className = '' }: HeaderProps) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = () => {
    supabaseClient.auth.signOut()
      .then(() => {
        // TODO: Reset any playing songs.
        router.refresh();

        toast.success('Logged out');
      }).catch((error: { message: string }) => {
        toast.error(error.message);
      });
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
          {user
            ? (
              <div className="flex items-center gap-x-4">
                <Button
                  className="bg-white px-6 py-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  className="bg-white"
                  onClick={() => router.push('/account')}
                >
                  <FaUserAlt />
                </Button>
              </div>
            )
            : (
              <>
                <div>
                  <Button
                    onClick={authModal.onOpen}
                    className="bg-transparent font-medium text-neutral-300"
                  >
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={authModal.onOpen}
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
};

export default Header;
