'use client';

import { BiErrorCircle } from 'react-icons/bi';
import Box from '@/components/Box';

const Error = () => (
  <Box className="flex h-full items-center justify-center">
    <div className="flex items-center gap-x-2">
      <BiErrorCircle className="text-3xl text-red-500" />
      <p className="text-2xl text-neutral-400">
        Something went wrong.
      </p>
    </div>
  </Box>
);

export default Error;
