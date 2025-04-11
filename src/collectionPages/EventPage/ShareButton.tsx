'use client';

import { useCallback, useState } from 'react';
import { useAtomValue } from 'jotai';

import { accentColorAtom } from '@/state/accentColorAtom';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const accentColor = useAtomValue(accentColorAtom);

  const handleShare = useCallback(async () => {
    if (!navigator.share) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        text: 'Check this out!',
        url: window.location.href,
      });
    } catch (error) {
      if (error instanceof Error && error.toString().includes('AbortError')) {
        return;
      }
    }
  }, []);

  return (
    <button
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleShare}
    >
      {copied ? (
        <svg
          className={`stroke-z-${accentColor}`}
          fill="none"
          height="21"
          viewBox="0 0 20 21"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5001 2.16602H7.50008C7.03984 2.16602 6.66675 2.53911 6.66675 2.99935V4.66602C6.66675 5.12625 7.03984 5.49935 7.50008 5.49935H12.5001C12.9603 5.49935 13.3334 5.12625 13.3334 4.66602V2.99935C13.3334 2.53911 12.9603 2.16602 12.5001 2.16602Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M13.3333 3.83398H14.9999C15.4419 3.83398 15.8659 4.00958 16.1784 4.32214C16.491 4.6347 16.6666 5.05862 16.6666 5.50065V17.1673C16.6666 17.6093 16.491 18.0333 16.1784 18.3458C15.8659 18.6584 15.4419 18.834 14.9999 18.834H4.99992C4.55789 18.834 4.13397 18.6584 3.82141 18.3458C3.50885 18.0333 3.33325 17.6093 3.33325 17.1673V5.50065C3.33325 5.05862 3.50885 4.6347 3.82141 4.32214C4.13397 4.00958 4.55789 3.83398 4.99992 3.83398H6.66659"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M7.5 12.1667L9.16667 13.8333L12.5 10.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg
          className={`stroke-z-${accentColor}`}
          fill="none"
          height="21"
          viewBox="0 0 20 21"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7.16602C16.3807 7.16602 17.5 6.04673 17.5 4.66602C17.5 3.2853 16.3807 2.16602 15 2.16602C13.6193 2.16602 12.5 3.2853 12.5 4.66602C12.5 6.04673 13.6193 7.16602 15 7.16602Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M5 13C6.38071 13 7.5 11.8807 7.5 10.5C7.5 9.11929 6.38071 8 5 8C3.61929 8 2.5 9.11929 2.5 10.5C2.5 11.8807 3.61929 13 5 13Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M15 18.834C16.3807 18.834 17.5 17.7147 17.5 16.334C17.5 14.9533 16.3807 13.834 15 13.834C13.6193 13.834 12.5 14.9533 12.5 16.334C12.5 17.7147 13.6193 18.834 15 18.834Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M7.15845 11.7578L12.8501 15.0745"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M12.8418 5.92578L7.15845 9.24245"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      )}
      <p className={`font-semibold text-z-${accentColor}`}>
        {copied ? 'Link copied!' : 'Share'}
      </p>
    </button>
  );
}
