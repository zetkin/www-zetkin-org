import React from 'react';
import { Link } from '@payloadcms/ui'; // Using Payload's Link component for consistency

// Custom cell component for the "usedInItems" column
// This component renders a link that directs to the filtered admin list
// for People, Events, or Jobs based on the tag's type.
interface RowData {
  id: string;
  type: string;
}

const LinkToList: React.FC<{ rowData: RowData }> = ({ rowData }) => {
  const tagId = rowData?.id;
  const tagType = rowData?.type;

  if (!tagId || !tagType) {
    return null;
  }

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
};

export default LinkToList;
