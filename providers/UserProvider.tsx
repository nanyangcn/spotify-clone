'use client';

import { MyUserContextProvider } from '@/hooks/useUser';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => (
  <MyUserContextProvider>
    {children}
  </MyUserContextProvider>
);

export default UserProvider;
