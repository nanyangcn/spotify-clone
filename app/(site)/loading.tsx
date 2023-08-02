'use client';

import { BiLoaderAlt } from 'react-icons/bi';
import Box from '@/components/Box';

const Loading = () => (
  <Box className="flex h-full items-center justify-center">
    <div className="flex items-center gap-x-2">
      <BiLoaderAlt className="animate-spin text-3xl" />
      <p className="text-2xl text-neutral-400">
        Loading...
      </p>
    </div>
  </Box>
);

export default Loading;
