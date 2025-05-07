'use client';

import React, { useState, useMemo, useEffect } from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';

import { Pagination } from './Pagination';

type IconName = keyof typeof PhosphorIcons;
type PhosphorIconComponent = React.FC<IconProps>;

const allIcons = (Object.entries(PhosphorIcons) as [string, unknown][])
  .filter(
    (entry): entry is [string, PhosphorIconComponent] =>
      typeof entry[1] === 'function'
  )
  .map(
    ([name, comp]) => [name as IconName, comp] as [IconName, PhosphorIconComponent]
  );

interface IconBrowserProps {
  selected?: string;
  onSelect?: (icon: string) => void;
}

export default function IconBrowser({ selected, onSelect }: IconBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const iconsPerPage = 20;

  const filteredIcons = useMemo(
    () =>
      allIcons.filter(([name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

  useEffect(() => setPage(1), [searchTerm]);

  const currentIcons = filteredIcons.slice(
    (page - 1) * iconsPerPage,
    page * iconsPerPage
  );

  return (
    <div className="p-4">
      <input
        className="mb-4 p-2 border rounded w-full"
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search icons..."
        type="text"
        value={searchTerm}
      />

      <div className="grid grid-cols-4 gap-4">
        {currentIcons.map(([name, Icon]) => {
          const isSelected = name === selected;
          return (
            <button
              key={name}
              className={`flex flex-col items-center p-2 border rounded hover:bg-gray-100 transition ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent'
              }`}
              onClick={() => onSelect?.(name)}
              type="button"
            >
              <Icon size={32} weight="regular" />
              <span className="text-sm mt-2">{name}</span>
            </button>
          );
        })}
      </div>

      <Pagination
        className="mt-6"
        onPageChange={setPage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
