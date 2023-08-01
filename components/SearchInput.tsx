'use client';

import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiSearch, BiX } from 'react-icons/bi';

import useDebounce from '@/hooks/useDebounce';
import Input from '@/components/Input';

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <BiSearch className="translate-y-[1px] text-xl" />
      </div>
      <Input
        type="text"
        className="h-12 w-[360px] rounded-full border border-transparent bg-neutral-700/50 pl-9 pr-4
        outline-2 outline-white hover:border hover:border-neutral-500/50 hover:bg-neutral-700 focus:outline"
        placeholder="What do you want to listen to?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="button"
        disabled={value === ''}
        className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:hidden"
        onClick={() => setValue('')}
      >
        <BiX className="text-2xl" />
      </button>
    </div>
  );
};

export default SearchInput;
