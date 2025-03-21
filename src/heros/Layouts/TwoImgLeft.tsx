import { ImageMedia } from '@/components/Media/ImageMedia';
import { LayoutProps } from './LayoutProps';

export default function TwoImgLeft({
  readTime,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col w-full md:max-w-250">
      {
        /* eslint-disable react/no-danger */
        <div className="" dangerouslySetInnerHTML={{ __html: html }} />
      }
      {readTime && <p>{readTime} min read</p>}
      <div className="h-[75vw] md:h-[30vw] md:max-h-[355px] md:w-full relative">
        <div className="object-cover absolute h-[44vw] w-[90vw] -left-1/14 top-0 md:left-[min(20%,106px)] md:top-0 md:w-[52vw] md:max-w-[601px] md:h-[25vw] md:max-h-[299px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[38vw] w-[53vw] top-7/15 -right-1/12 md:top-[min(30%,120px)] md:right-[min(20%,107px)] md:w-[30vw] md:max-w-[314px] md:h-[20vw] md:max-h-[235px]">
          {images[1]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[1].image}
            />
          )}
        </div>
      </div>
    </div>
  );
}
