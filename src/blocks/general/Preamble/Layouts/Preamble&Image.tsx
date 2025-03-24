import { LayoutProps } from './LayoutProps';
import { ImageMedia } from '@/components/Media/ImageMedia';

export default function PreambleNImage({ preamble, image }: LayoutProps) {
  return (
    <div className="w-full flex flex-col gap-10 md:flex-row md:items-center md:max-w-250 md:gap-0">
      {preamble && (
        <h6 className="w-full md:w-[100vw] md:max-w-[550px]">{preamble}</h6>
      )}
      {image && (
        <div className="relative h-[55vw] w-[90vw] ml-[10vw] md:w-[90vw] md:h-[40vw] md:max-w-[441px] md:max-h-[294px] md:-mr-[5vw] md:mt-4">
          <ImageMedia fill imgClassName="object-cover" resource={image} />
        </div>
      )}
    </div>
  );
}
