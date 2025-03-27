import RichText from '@/components/RichText';
import { LayoutProps } from './LayoutProps';

export default function LongHeaderNText({ header, mainText }: LayoutProps) {
  return (
    <div className="w-full flex flex-col gap-7 sm:max-w-250 md:grid md:grid-cols-2 md:gap-15">
      {header && <h4>{header}</h4>}
      {mainText && <RichText data={mainText} enableGutter={false} />}
    </div>
  );
}
