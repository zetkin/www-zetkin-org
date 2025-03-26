import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function ImagesCenter({
  subtitle,
  buttons,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-10 z-10 w-full md:max-w-[1000px] items-start ">
      <div className="flex flex-col w-full  justify-center gap-10">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col gap-4 max-w-[450px] z-10">
            {
              /* eslint-disable react/no-danger */
              <div
                className="text-center w-full group smaller-text"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            }
            <p className="text-lg leading-[1.7] font-light text-center w-full">
              {subtitle}
            </p>
          </div>
        </div>
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
        <div className="flex flex-col gap-4 w-full items-center sm:flex-row sm:gap-5 sm:justify-center">
          {buttons?.map((button, index) => (
            <Link key={index} url={button.link?.url || ''}>
              <Button variant={button.variant}>{button.label}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
