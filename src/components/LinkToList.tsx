import React from 'react';
import { Link } from '@payloadcms/ui';

interface RowData {
  id: string;
}

const LinkToList: React.FC<{ rowData: RowData }> = ({ rowData }) => {
  const tagId = rowData?.id;
  const tagTypes = ['people', 'jobs', 'events'];

  if (!tagId) {
    return null;
  }

  function renderLinks() {
    return (
      <p>
        Search{' '}
        {tagTypes.map((type, i) => {
          const baseUrl = `/admin/collections/${type}`;
          const query = `where[or][0][and][0][tags][in][0]=${encodeURIComponent(tagId)}`;
          const url = `${baseUrl}?${query}`;
          const isLast = i === tagTypes.length - 1;
          return (
            <span key={i}>
              <Link
                href={url}
                rel="noopener noreferrer"
                style={{
                  padding: '0.25rem 0',
                  fontWeight: '500',
                  color: '#0077ff',
                  textDecoration: 'underline',
                }}
                target="_blank"
              >
                {type}
              </Link>
              {!isLast ? ', ' : ''}
            </span>
          );
        })}{' '}
        for tag
      </p>
    );
  }

  return renderLinks();
};

export default LinkToList;
