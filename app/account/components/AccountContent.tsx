'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import { toErrWithMsg } from '@/utils/errParser';
import { postData } from '@/libs/helpers';
import Button from '@/components/Button';

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData<{ url: string, error: Error }>({
        url: '/api/create-portal-link',
      });

      if (error) {
        setLoading(false);
        return toast.error(toErrWithMsg(error).message);
      }
      setLoading(false);
      return window.location.assign(url);
    } catch (err) {
      setLoading(false);
      throw new Error(toErrWithMsg(err).message);
    }
  };

  return (
    <div className="mb-7 px-6">
      {!subscription ? (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button
            onClick={subscribeModal.onOpen}
            className="w-[300px]"
          >
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the
            {' '}
            <b>{subscription?.prices?.products?.name}</b>
            {' '}
            plan.
          </p>
          <Button
            className="w-[300px]"
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
