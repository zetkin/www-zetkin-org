'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/utilities/ui';

export const Pagination: React.FC<{
  className?: string;
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}> = (props) => {
  const router = useRouter();

  const { className, page, totalPages, onPageChange } = props;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const hasExtraPrevPages = page - 1 > 1;
  const hasExtraNextPages = page + 1 < totalPages;

  const changePage = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage); // Use callback when provided
    } else {
      router.push(`/posts/page/${newPage}`);
    }
  };

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                changePage(page - 1);
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  changePage(page - 1);
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                changePage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  changePage(page + 1);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                changePage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};
