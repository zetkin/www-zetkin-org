import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react';

import { cn } from '@/utilities/ui';
import type { TextWithQuoteBlock as TextWithQuoteBlockProps } from '@/payload-types';
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types';
import type { InfoBoxBlock as InfoBoxBlockProps } from '@/payload-types';
import type { OneImageBlock as OneImageBlockProps } from '@/payload-types';
import type { TwoImageBlock as TwoImageBlockProps } from '@/payload-types';
import type { PreambleArticleBlock as PreambleArticleBlockProps } from '@/payload-types';
import { TextWithQuoteBlock } from '@/blocks/Article/TextWithQuote/Component';
import { ButtonBlock } from '@/blocks/Article/Button/Component';
import { InfoBoxBlock } from '@/blocks/Article/InfoBox/Component';
import { OneImageBlock } from '@/blocks/Article/OneImage/Component';
import { TwoImageBlock } from '@/blocks/Article/TwoImages/Component';
import { PreambleArticleBlock } from '@/blocks/Article/Preamble/Component';

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    textWithQuote: ({
      node,
    }: {
      node: SerializedBlockNode<TextWithQuoteBlockProps>;
    }) => <TextWithQuoteBlock {...node.fields} />,
    oneImage: ({ node }: { node: SerializedBlockNode<OneImageBlockProps> }) => (
      <OneImageBlock {...node.fields} />
    ),
    twoImage: ({ node }: { node: SerializedBlockNode<TwoImageBlockProps> }) => (
      <TwoImageBlock {...node.fields} />
    ),
    button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => (
      <ButtonBlock {...node.fields} />
    ),
    infoBox: ({ node }: { node: SerializedBlockNode<InfoBoxBlockProps> }) => (
      <InfoBoxBlock {...node.fields} />
    ),
    preambleArticle: ({
      node,
    }: {
      node: SerializedBlockNode<PreambleArticleBlockProps>;
    }) => <PreambleArticleBlock {...node.fields} />,
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert text-black': enableProse,
        },
        className,
      )}
      converters={jsxConverters}
      {...rest}
    />
  );
}
