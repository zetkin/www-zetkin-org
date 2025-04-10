'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AccentColorProviderType = {
  accentColor: string;
  setAccentColor: (val: string) => void;
};

const AccentColorContext = createContext<AccentColorProviderType | undefined>(
  undefined,
);

export const useAccentColorContext = () => {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export const AccentColorProvider = ({ children }: { children: ReactNode }) => {
  const [accentColor, setAccentColor] = useState('initial');

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};
