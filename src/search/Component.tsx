'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/utilities/useDebounce';

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`);
  }, [debouncedValue, router]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label className="sr-only" htmlFor="search">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="Search"
        />
        <button className="sr-only" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};
