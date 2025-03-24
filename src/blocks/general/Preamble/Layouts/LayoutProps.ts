import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

import { Media } from '@/payload-types';

export type LayoutProps = {
  header?: string;
  image?: string | Media;
  preamble?: string;
  mainText?: SerializedEditorState
};
