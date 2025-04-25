import { ImageMedia } from '@/components/Media/ImageMedia';
import { LayoutProps } from './LayoutProps';

export default function OneImgCenter({
  readTime,
  images = [],
  html,
  eyebrowHeading,
}: LayoutProps) {
  return (
    <div className="flex flex-col w-full gap-12 xl:max-w-250">
      <div className="flex flex-col gap-4 justify-center">
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
      <div className="h-[80vw] xl:h-[70vw] xl:max-h-[700px] xl:w-full relative">
        <div className="object-cover absolute h-[76vw] w-[94vw] -left-1/14 top-0 xl:left-auto xl:right-[min(-24%,-185px)] xl:top-0 xl:w-[120vw] xl:max-w-[1400px] xl:h-[60vw] xl:max-h-[700px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
      </div>
    </div>
  );
}
