'use client';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { Price, ProductWithPrice } from '@/types/types';
import { useUser } from '@/hooks/useUser';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { postData } from '@/libs/helpers';
import getStripe from '@/libs/stripeClient';
import { toErrWithMsg } from '@/utils/errParser';
import Modal from './Modal';
import Button from './Button';

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const subscriptionModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('You must be signed in to subscribe.');
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast('Already subscribed.');
    }

    try {
      const { sessionId } = await postData<{ sessionId: string }>({
        url: '/api/create-checkout-session',
        data: {
          price,
        },
      });

      const stripe = await getStripe();
      return await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      return toast.error(toErrWithMsg(err).message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      subscriptionModal.onClose();
    }
  };

  let content = (
    <div className="text-center">
      No product.
    </div>
  );

  if (subscription) {
    content = (
      <div className="text-center">
        Already subscribed.
      </div>
    );
  }

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <div key={product.id} className="text-center">
                No price.
              </div>
            );
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || priceIdLoading === price.id}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)}/${price.interval ?? 'month'}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  return (
    <Modal
      title="Subscribe"
      description="Subscribe to us"
      isOpen={subscriptionModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
