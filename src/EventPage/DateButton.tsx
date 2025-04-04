'use client';

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';

import { formatEventDates } from '@/blocks/lists/Events/formatEventDates';

interface DocProps {
  title: string;
  description?:
    | {
        root: {
          [k: string]: unknown;
          type: string;
          children: { [k: string]: unknown; type: string; version: number }[];
          direction: 'ltr' | 'rtl' | null;
          format:
            | ''
            | 'center'
            | 'end'
            | 'start'
            | 'left'
            | 'right'
            | 'justify';
          indent: number;
          version: number;
        };
      }
    | null
    | undefined;
  online?: boolean | null | undefined;
  address?: string | null | undefined;
  city?: string | null | undefined;
  startDate: string;
  endDate?: string | null | undefined;
}

export default function DateButton({
  doc,
  color,
}: {
  doc: DocProps;
  color: string;
}) {
  const data: SerializedEditorState = doc.description ?? {
    root: {
      type: '',
      children: [],
      version: 0,
      direction: null,
      format: '',
      indent: 0,
    },
  };

  const plaintext = convertLexicalToPlaintext({ data });

  const generateICS = () => {
    const formatDateOnly = (isoString?: string): string => {
      if (!isoString) {
        return '';
      }
      const dateOnly = isoString.split('T')[0];
      return dateOnly ? dateOnly.replace(/-/g, '') : '';
    };

    const formattedStart = formatDateOnly(doc.startDate!);
    const formattedEnd = doc.endDate
      ? formatDateOnly(doc.endDate)
      : formattedStart;

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${doc?.title}`,
      `DESCRIPTION:${plaintext.replace(/[^\x00-\x7F]/g, '').replace(/\n/g, '\\n')}`,
      `LOCATION:${doc?.online ? 'online' : `${doc?.address}, ${doc?.city}`}`,
      `DTSTART;VALUE=DATE:${formattedStart}`,
      `DTEND;VALUE=DATE:${formattedEnd}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = icsLines.join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'evento.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className={`fill-z-${color} text-z-${color} leading-[170%] cursor-pointer font-semibold`}
      onClick={generateICS}
    >
      {formatEventDates(doc.startDate, doc.endDate || undefined, true)}
    </button>
  );
}
