import React, { Fragment } from 'react';

import type { Page } from '@/payload-types';
import { ContentBlock } from '@/blocks/Content/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { LandingBlock } from './home/Landing/Component';
import { GradientBlock } from './home/Gradient/Component';
import { WhiteBg } from './home/WhiteBg/Component';

const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  landing: LandingBlock,
  gradient: GradientBlock,
  whiteBg: WhiteBg,
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
