import { User } from '@supabase/auth-helpers-nextjs';
import {
  createContext, useEffect, useState, useMemo, useContext,
} from 'react';

import { Subscription, UserDetails } from '@/types/types';
import { useSessionContext, useUser as useSupabaseUser } from '@supabase/auth-helpers-react';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: unknown;
}

export function MyUserContextProvider(props: Props) {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();
  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const getUserDetails = () => supabaseClient
      .from('users')
      .select('*')
      .single();
    const getSubscription = () => supabaseClient
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

    if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }

    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()])
        .then(([userDetailsPromise, subscriptionPromise]) => {
          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }).catch(() => {
          throw new Error('Failed to fetch user details or subscription');
        });
    }
  }, [user, userDetails, isLoadingUser, isLoadingData, supabaseClient]);

  const value = useMemo(() => ({
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }), [accessToken, isLoadingData, isLoadingUser, subscription, user, userDetails]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <UserContext.Provider value={value} {...props} />;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
