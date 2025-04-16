import RichText from '@/components/RichText';
import { LayoutProps } from './LayoutProps';
import { ImageMedia } from '@/components/Media/ImageMedia';

export default function PreambleHeaderTextNImage({
  preamble,
  mainText,
  header,
  image,
}: LayoutProps) {
  return (
    <div
      className={`w-full flex flex-col gap-5 md:flex-row md:gap-15 md:items-center md:max-w-250 ${!image ? 'md:justify-center' : ''}`}
    >
      <div
        className={`flex flex-col w-full md:w-[80vw] gap-12 md:gap-16 ${!image ? 'md:justify-center' : 'md:max-w-[550px]'}`}
      >
        {preamble && <h6 className="w-full">{preamble}</h6>}
        {image && (
          <div className="relative md:hidden h-[55vw] w-[90vw] ml-[10vw]">
            <ImageMedia fill imgClassName="object-cover" resource={image} />
          </div>
        )}
        <div className="flex flex-col gap-6 md:gap-7">
          {header && <h4 className="w-full">{header}</h4>}
          {mainText && (
            <RichText className="w-full" data={mainText} enableGutter={false} />
          )}
        </div>
      </div>
      {image && (
        <div className="hidden md:inline relative w-[70vw] h-[40vw] max-w-[441px] max-h-[294px] -mr-[10vw] mt-4">
          <ImageMedia fill imgClassName="object-cover" resource={image} />
        </div>
      )}
    </div>
  );
}
