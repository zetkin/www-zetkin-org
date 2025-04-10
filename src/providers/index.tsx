import React from 'react';

import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';
import { AccentColorProvider } from './AccentColorProvider';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AccentColorProvider>{children}</AccentColorProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  );
};
