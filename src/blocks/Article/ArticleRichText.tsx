'use client'

import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import RichText from "@/components/RichText";
import { useAccentColorContext } from "@/providers/AccentColorProvider";


export default function ArticleRichText({ richText }: { richText: SerializedEditorState }) {

    const { accentColor } = useAccentColorContext();

    return (
        <RichText
            className={`w-full overflow-visible prose-p:text-black prose-h5:text-black prose-ol:text-black marker:text-black prose-a:text-z-${accentColor}`}
            data={richText}
            enableGutter={false}
        />
    );
}