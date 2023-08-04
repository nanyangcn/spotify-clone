'use client';

import { useEffect } from 'react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from '@/components/Modal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [onClose, session, router]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back!"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        supabaseClient={supabaseClient}
        providers={['github']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
              fonts: {
                bodyFontFamily: 'inherit',
                buttonFontFamily: 'inherit',
                inputFontFamily: 'inherit',
                labelFontFamily: 'inherit',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
