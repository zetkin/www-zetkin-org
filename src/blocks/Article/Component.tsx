import React from 'react';

import RichText from '@/components/RichText';
import type { ArticleBlock as ArticleBlockProps } from '@/payload-types';

export const ArticleBlock: React.FC<ArticleBlockProps> = (props) => {
  const { richText, linkColor } = props;

  const _twPredeclare = [
    'prose-a:text-z-red',
    'prose-a:text-z-green',
    'prose-a:text-z-purple',
  ];

  return (
    <div className="flex mx-5 w-full justify-center">
      <div className="flex md:max-w-[630px] md:mr-20 overflow-visible">
        {richText && (
          <RichText
            className={`w-full overflow-visible prose-p:text-black prose-h5:text-black prose-a:text-z-${linkColor}`}
            data={richText}
            enableGutter={false}
          />
        )}
      </div>
    </div>
  );
};
