'use client';

import React from 'react';
import type { TextFieldClientComponent } from 'payload';
import { useField } from '@payloadcms/ui';

import IconBrowser from '@/components/IconBrowser';

export const IconPicker: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  return (
    <div>
      <IconBrowser
        onSelect={(iconName) => setValue(iconName)}
        selected={value}
      />
    </div>
  );
};

export default IconPicker;
