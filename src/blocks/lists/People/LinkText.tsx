'use client'

import { ReactNode } from 'react';

import { useAccentColorContext } from '@/providers/AccentColorProvider';

export default function LinkText({ children }: { children: ReactNode }) {

    const { accentColor } = useAccentColorContext();

    return (
        <p
            className={`underline font-light text-z-${accentColor}`}
        >
            {children}
        </p>
    )
}