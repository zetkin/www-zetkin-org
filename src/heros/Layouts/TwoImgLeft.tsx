import { ImageMedia } from '@/components/Media/ImageMedia';
import { LayoutProps } from './LayoutProps';

export default function TwoImgLeft({
  readTime,
  images = [],
  html,
  subtitle,
}: LayoutProps) {
  return (
    <div className="flex flex-col w-full gap-12 md:max-w-[630px] overflow-visible">
      <div className="flex flex-col gap-4">
        {subtitle && <p className="text-lg">{subtitle}</p>}
        {
          /* eslint-disable react/no-danger */
          <div
            className="w-full sm:w-[80vw] sm:max-w-[740px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        }
        {readTime && <p>{readTime} min read</p>}
      </div>
      <div className="h-[90vw] md:h-[70vw] md:max-h-[651px] md:w-full relative">
        <div className="object-cover absolute h-[46vw] w-[76vw] -left-1/14 top-0 md:left-[min(20%,100px)] md:top-0 md:w-[70vw] md:max-w-[722px] md:h-[50vw] md:max-h-[500px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[52vw] w-[83vw] top-7/16 -right-1/12 md:top-[min(100%,316px)] md:right-[min(55vw,326px)] md:w-[40vw] md:max-w-[446px] md:h-[30vw] md:max-h-[335px]">
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
