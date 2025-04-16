import React from 'react';
import { Link } from '@payloadcms/ui'; // Using Payload's Link component for consistency

// Custom cell component for the "usedInItems" column
// This component renders a link that directs to the filtered admin list
// for People, Events, or Jobs based on the tag's type.
interface RowData {
  id: string;
  type: string | [string];
}

const LinkToList: React.FC<{ rowData: RowData }> = ({ rowData }) => {
  const tagId = rowData?.id;
  const tagType = rowData?.type;

  if (!tagId || !tagType) {
    return null;
  }

  function renderLinks() {
    if (Array.isArray(tagType) && tagType.length > 1) {
      return (
        <p>
          All{' '}
          {tagType.map((type, i) => {
            const baseUrl = `/admin/collections/${type}`;
            const query = `where[or][0][and][0][tags][in][0]=${encodeURIComponent(tagId)}`;
            const url = `${baseUrl}?${query}`;
            const isLast = i === tagType.length - 1;
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
          with tag
        </p>
      );
    } else {
      const baseUrl = `/admin/collections/${tagType}`;
      const query = `where[or][0][and][0][tags][in][0]=${encodeURIComponent(tagId)}`;
      const url = `${baseUrl}?${query}`;
      return (
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
          All {tagType} with tag
        </Link>
      );
    }
  }

  return renderLinks();
};

export default LinkToList;
