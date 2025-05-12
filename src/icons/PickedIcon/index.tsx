import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';

import {
  IconApple,
  IconBanana,
  IconBean,
} from 'src/icons/PickedIcon/CustomIcons';

// Define the types
type IconType = 'phosphor' | 'custom';

type IconValue = {
  icon: string;
  type: IconType;
};

// Custom icon mapping
const customIcons = {
  banana: IconBanana,
  bean: IconBean,
  apple: IconApple,
};

type PickedItemProps = {
  value: IconValue | string | null;
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
};

// Helper function to parse the icon value
const parseIconValue = (value: IconValue | string | null): IconValue => {
  if (!value) {
    return { icon: '', type: 'phosphor' };
  }

  if (typeof value === 'string') {
    try {
      // Try to parse JSON string
      const parsed = JSON.parse(value);
      return parsed.icon ? parsed : { icon: value, type: 'phosphor' };
    } catch {
      // If not JSON, treat as string icon name
      return { icon: value, type: 'phosphor' };
    }
  }
  // If it's already an object
  return value as IconValue;
};

export const PickedItem: React.FC<PickedItemProps> = ({
  value,
  width = '24',
  height = '24',
  color = 'currentColor',
  className = '',
  weight = 'regular',
}) => {
  // Parse the value to ensure it's in the correct format
  const iconData = React.useMemo(() => parseIconValue(value), [value]);

  // Handle empty icon
  if (!iconData.icon) {
    return null;
  }

  // Render Phosphor icon
  if (iconData.type === 'phosphor') {
    const IconComponent = PhosphorIcons[
      iconData.icon as keyof typeof PhosphorIcons
    ] as React.FC<IconProps>;

    if (!IconComponent) {
      return null;
    }

    // Convert width/height to number if they include 'px'
    const size = width ? parseInt(width.replace('px', ''), 10) : 24;

    return (
      <IconComponent
        className={className}
        color={color}
        size={size}
        weight={weight}
      />
    );
  }

  // Render custom icon
  if (iconData.type === 'custom') {
    const IconComponent =
      customIcons[iconData.icon as keyof typeof customIcons];

    if (!IconComponent) {
      return null;
    }

    return (
      <IconComponent
        color={color}
        height={height}
        iconClasses={className}
        width={width}
      />
    );
  }

  // Fallback for unknown types
  return null;
};

// Legacy compatibility component
export const FeatureIcon = PickedItem;

export default PickedItem;
