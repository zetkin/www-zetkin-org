import React from 'react';

import type { ArticleBlock as ArticleBlockProps } from '@/payload-types';
import ArticleRichText from './ArticleRichText';
import { Author } from '../../components/Author/Component';

export const ArticleBlock: React.FC<ArticleBlockProps> = (props) => {
  const { richText, author, socialLink } = props;

  const _twPredeclare = [
    'prose-a:text-z-red',
    'prose-a:text-z-green',
    'prose-a:text-z-purple',
  ];

  return (
    <div className="flex mx-5 w-full justify-center">
      <div className="flex flex-col md:max-w-[630px] w-full md:pr-20 overflow-visible">
        {author && <Author author={author} socialLink={socialLink} />}
        {richText && <ArticleRichText richText={richText} />}
      </div>
    </div>
  );
};
