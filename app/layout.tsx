import './globals.css';
import { Figtree } from 'next/font/google';

import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Clone',
  description: 'Let\'s play Spotify!',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <html lang="en">
    <body className={font.className}>
      <ToasterProvider />
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider />
          <Sidebar>
            {children}
          </Sidebar>
        </UserProvider>
      </SupabaseProvider>
    </body>
  </html>
);

export default RootLayout;
