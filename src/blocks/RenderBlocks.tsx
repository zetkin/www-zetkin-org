import React, { Fragment } from 'react';

import type { Page } from '@/payload-types';
import { LandingBlock } from './home/Landing/Component';
import { GradientBlock } from './home/Gradient/Component';
import { WhiteBgBlock } from './home/WhiteBg/Component';
import { PreambleBlock } from './general/Preamble/Component';
import { PreambleArticleBlock } from './Article/Preamble/Component';
import { ArticleHighlightBlock } from './general/ArticleHighlight/Component';
import { ArticleBlock } from './Article/Component';
import { TextWithQuoteBlock } from './Article/TextWithQuote/Component';
import { ButtonBlock } from './Article/Button/Component';
import { InfoBoxBlock } from './Article/InfoBox/Component';
import PeopleListBlock from './lists/People/Component';
import EventListBlock from './lists/Events/Component';
import JobsListBlock from './lists/Jobs/Component';
import FeatureListBlock from './lists/Feature/Component';
import { OneImageBlock } from './Article/OneImage/Component';
import { TwoImageBlock } from './Article/TwoImages/Component';

const blockComponents = {
  landing: LandingBlock,
  gradient: GradientBlock,
  whiteBg: WhiteBgBlock,
  preamble: PreambleBlock,
  articleHighlight: ArticleHighlightBlock,
  article: ArticleBlock,
  textWithQuote: TextWithQuoteBlock,
  oneImage: OneImageBlock,
  twoImage: TwoImageBlock,
  button: ButtonBlock,
  infoBox: InfoBoxBlock,
  preambleArticle: PreambleArticleBlock,
  featureList: FeatureListBlock,
  peopleList: PeopleListBlock,
  eventList: EventListBlock,
  jobsList: JobsListBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div key={index} className="w-full h-full flex justify-center">
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
