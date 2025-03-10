import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
  expanded?: boolean;
  mobile?: boolean;
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    expanded,
    mobile
  } = props;

  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  return (
    <img
      alt="Payload Logo"
      decoding="async"
      fetchPriority={priority}
      loading={loading}
      src={expanded ? "/logo_text.webp" : "/logo.webp"}
      className={`${expanded ? 'w-30 sm:w-20' : 'w-10 sm:w-9'}`}
    />
  );
};
