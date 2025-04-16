import React from 'react';

import type { ArticleBlock as ArticleBlockProps } from '@/payload-types';
import ArticleRichText from './ArticleRichText';

export const ArticleBlock: React.FC<ArticleBlockProps> = (props) => {
  const { richText } = props;

  const _twPredeclare = [
    'prose-a:text-z-red',
    'prose-a:text-z-green',
    'prose-a:text-z-purple',
  ];

  return (
    <div className="flex mx-5 w-full justify-center">
      <div className="flex md:max-w-[630px] md:pr-20 overflow-visible">
        {richText && <ArticleRichText richText={richText} />}
      </div>
    </div>
  );
};
