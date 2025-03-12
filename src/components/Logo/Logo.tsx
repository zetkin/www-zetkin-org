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
    expanded,
  } = props;

  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  return (
    <img
      alt="Payload Logo"
      className={`${expanded ? 'w-30 sm:w-20' : 'w-10 sm:w-9'}` + ' ' + className}
      decoding="async"
      fetchPriority={priority}
      loading={loading}
      src={expanded ? "/logo_text.webp" : "/logo.webp"}
    />
  );
};
