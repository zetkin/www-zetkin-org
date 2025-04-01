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
import type { ImageBlock as ImageBlockProps } from '@/payload-types';
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types';
import type { AuthorBlock as AuthorBlockProps } from '@/payload-types';
import type { InfoBoxBlock as InfoBoxBlockProps } from '@/payload-types';
import { TextWithQuoteBlock } from '@/blocks/Article/TextWithQuote/Component';
import { ImageBlock } from '@/blocks/Article/Image/Component';
import { ButtonBlock } from '@/blocks/Article/Button/Component';
import { AuthorBlock } from '@/blocks/Article/Author/Component';
import { InfoBoxBlock } from '@/blocks/Article/InfoBox/Component';

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
    image: ({ node }: { node: SerializedBlockNode<ImageBlockProps> }) => (
      <ImageBlock {...node.fields} />
    ),
    button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => (
      <ButtonBlock {...node.fields} />
    ),
    infoBox: ({ node }: { node: SerializedBlockNode<InfoBoxBlockProps> }) => (
      <InfoBoxBlock {...node.fields} />
    ),
    author: ({ node }: { node: SerializedBlockNode<AuthorBlockProps> }) => (
      <AuthorBlock {...node.fields} />
    ),
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
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      converters={jsxConverters}
      {...rest}
    />
  );
}
