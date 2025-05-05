import { ImageMedia } from '@/components/Media/ImageMedia';
import { LayoutProps } from './LayoutProps';

export default function TwoImgCenter({
  readTime,
  images = [],
  html,
  eyebrowHeading,
}: LayoutProps) {
  return (
    <div className="flex flex-col w-full gap-12 md:max-w-250">
      <div className="flex flex-col gap-4 w-full justify-center">
        {eyebrowHeading && (
          <p className="text-lg text-center">{eyebrowHeading}</p>
        )}
        {
          /* eslint-disable react/no-danger */
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: html || '' }}
          />
        }
        {readTime && <p className="text-center">{readTime} min read</p>}
      </div>
      <div className="h-[90vw] md:h-[70vw] md:max-h-[651px] md:w-full relative">
        <div className="object-cover absolute h-[46vw] w-[76vw] -left-1/14 top-0 md:left-auto md:right-[min(30%,278px)] md:top-0 md:w-[75vw] md:max-w-[722px] md:h-[55vw] md:max-h-[500px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[52vw] w-[83vw] top-7/16 -right-1/12 md:top-[min(100%,316px)] md:right-auto md:left-[min(50vw,600px)] md:w-[40vw] md:max-w-[446px] md:h-[30vw] md:max-h-[335px]">
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
