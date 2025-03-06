import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
  expanded?: boolean;
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    expanded
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
      width={expanded ? 80 : 36}
    />
  );
};
