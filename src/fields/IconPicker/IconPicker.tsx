'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useField } from '@payloadcms/ui';
import * as PhosphorIcons from '@phosphor-icons/react';
import { X } from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
import type { TextFieldClientComponent } from 'payload';

import { Pagination } from '@/components/Pagination';
import {
  IconBanana,
  IconBean,
  IconApple,
  iconOptions,
} from '@/icons/PickedIcon/CustomIcons';

import './styles.css';

type IconName = keyof typeof PhosphorIcons;
type PhosphorIconComponent = React.FC<IconProps>;
type IconType = 'phosphor' | 'custom';

// Custom icon component props
type CustomIconProps = {
  width?: string;
  height?: string;
  color?: string;
  iconClasses?: string;
};

// Define icon value structure
export type IconValue = {
  icon: string;
  type: IconType;
};

// All Phosphor icons
const allIcons = (Object.entries(PhosphorIcons) as [string, unknown][])
  .filter(
    (entry): entry is [string, PhosphorIconComponent] =>
      typeof entry[1] === 'function' || typeof entry[1] === 'object',
  )
  .map(
    ([name, comp]) =>
      [name as IconName, comp] as [IconName, PhosphorIconComponent],
  );

// Custom icon mapping
const customIconComponents: Record<string, React.FC<CustomIconProps>> = {
  banana: IconBanana,
  bean: IconBean,
  apple: IconApple,
};

export const IconPicker: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<IconValue>({ path });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIconType, setActiveIconType] = useState<IconType>('phosphor');
  const iconsPerPage = 20;

  // Initialize with proper structure if not already set
  useEffect(() => {
    if (!value || typeof value === 'string') {
      setValue({ icon: value || '', type: 'phosphor' } as IconValue);
    }
  }, [value, setValue]);

  const currentIconData: IconValue =
    value && typeof value === 'object'
      ? (value as IconValue)
      : { icon: typeof value === 'string' ? value : '', type: 'phosphor' };

  // Define type for the filtered icons
  const filteredIcons = useMemo(() => {
    if (activeIconType === 'phosphor') {
      return allIcons.filter(([name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      return iconOptions.filter(
        (option: CustomIconOption) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
  }, [searchTerm, activeIconType]) as Array<
    [IconName, PhosphorIconComponent] | CustomIconOption
  >;

  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

  useEffect(() => setPage(1), [searchTerm, activeIconType]);

  const currentIcons = filteredIcons.slice(
    (page - 1) * iconsPerPage,
    page * iconsPerPage,
  );

  const handleSelectIcon = useCallback(
    (name: string, event: React.MouseEvent<HTMLButtonElement>) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValue({ icon: name, type: activeIconType });
      setIsOpen(false);
      return false;
    },
    [setValue, activeIconType],
  );

  const handleClearSelection = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValue({ icon: '', type: 'phosphor' });
      return false;
    },
    [setValue],
  );

  const openIconPicker = useCallback((type: IconType) => {
    setActiveIconType(type);
    setIsOpen(true);
    setSearchTerm('');
  }, []);

  const closeIconPicker = useCallback(() => {
    setIsOpen(false);
  }, []);

  const preventFormSubmission = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  // Get the selected icon component if there is one
  const renderSelectedIcon = () => {
    const { icon, type } = currentIconData;

    if (!icon) {
      return null;
    }

    if (type === 'phosphor') {
      const SelectedIcon = PhosphorIcons[
        icon as IconName
      ] as PhosphorIconComponent;
      return SelectedIcon ? <SelectedIcon size={24} weight="regular" /> : null;
    } else {
      const CustomIcon = customIconComponents[icon];
      return CustomIcon ? (
        <CustomIcon color="currentColor" height="24" width="24" />
      ) : null;
    }
  };

  // Define proper types for the CustomIcon options
  type CustomIconOption = {
    value: string;
    label: string;
  };

  // Render icons in the grid based on active type
  const renderIconGridItem = (
    iconData: [IconName, PhosphorIconComponent] | CustomIconOption,
    index: number,
  ) => {
    if (activeIconType === 'phosphor') {
      const [name, Icon] = iconData as [IconName, PhosphorIconComponent];
      const isSelected =
        currentIconData.type === 'phosphor' && currentIconData.icon === name;

      return (
        <button
          key={index}
          className={`icon-button ${isSelected ? 'icon-button-selected' : ''}`}
          onClick={(event) => handleSelectIcon(name, event)}
          onMouseDown={(e) => e.preventDefault()}
          type="button"
        >
          <Icon size={32} weight="regular" />
          <span className="icon-name">{name}</span>
        </button>
      );
    } else {
      const { value: iconValue, label } = iconData as CustomIconOption;
      const isSelected =
        currentIconData.type === 'custom' && currentIconData.icon === iconValue;
      const CustomIcon = customIconComponents[iconValue];

      return (
        <button
          key={iconValue}
          className={`icon-button ${isSelected ? 'icon-button-selected' : ''}`}
          onClick={(event) => handleSelectIcon(iconValue, event)}
          onMouseDown={(e) => e.preventDefault()}
          type="button"
        >
          {CustomIcon && (
            <CustomIcon color="currentColor" height="32" width="32" />
          )}
          <span className="icon-name">{label}</span>
        </button>
      );
    }
  };

  return (
    <div className="icon-picker-root">
      <label className="field-label" htmlFor="icon-select-button">
        Icon select<span className="required">*</span>
      </label>

      <div className="icon-picker-selection">
        <div className="icon-picker-preview">
          {currentIconData.icon ? (
            <div className="icon-picker-selected">
              {renderSelectedIcon()}
              <span className="icon-picker-selected-name">
                {currentIconData.icon} ({currentIconData.type})
              </span>
              <button
                aria-label="Clear icon selection"
                className="icon-picker-clear-button"
                onClick={handleClearSelection}
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="icon-picker-buttons">
              <button
                className="icon-picker-button"
                id="phosphor-icon-select-button"
                onClick={() => openIconPicker('phosphor')}
                type="button"
              >
                Select Phosphor Icon
              </button>
              <button
                className="icon-picker-button"
                id="custom-icon-select-button"
                onClick={() => openIconPicker('custom')}
                type="button"
              >
                Select Custom Icon
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="icon-picker-popover" onSubmit={preventFormSubmission}>
          <div className="icon-picker-popover-header">
            <input
              className="icon-picker-search-input"
              id="icon-search"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${activeIconType} icons...`}
              type="text"
              value={searchTerm}
            />
            <button
              aria-label="Close icon picker"
              className="icon-picker-close-button"
              onClick={closeIconPicker}
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="icon-grid">
            {currentIcons.map((iconData, index) =>
              renderIconGridItem(iconData, index),
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              className="mt-6"
              onPageChange={setPage}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default IconPicker;
