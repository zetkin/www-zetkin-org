import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function LeftAligned1({
  subtitle,
  buttons,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col z-10 gap-10 md:gap-0 md:w-full md:flex-row-reverse md:max-w-[1000px] md:justify-between">
      <div className="h-[88vw] md:h-[40vw] md:max-h-[356px] md:w-[40%] lg:w-[25%] relative">
        <div className="object-cover absolute h-[55vw] w-[92vw] -left-1/12 z-0  md:left-auto md:top-[min(10vw,45px)] md:right-[min(-100px,20vw)] md:w-[40vw] md:max-w-[296px] md:h-[25vw] md:max-h-[192px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[40vw] w-[60vw] top-13/25 -right-1/12 z-10 md:top-17/28 md:right-[max(2vw,-60px)] md:w-[35vw] md:max-w-[283px] md:h-[52vw] md:max-h-[188px]">
          {images[1]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[1].image}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:justify-around">
        <div className="flex flex-col gap-4">
          {
            /* eslint-disable react/no-danger */
            <div
              className="group larger-text"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          }
          <div className="flex flex-col gap-8">
            <p className="text-lg leading-[1.7] font-light md:text-base md:max-w-[450px]">
              {subtitle}
            </p>
            <div className="flex gap-4">
              {buttons?.map((button, index) => (
                <Link key={index} url={button.link?.url || ''}>
                  <Button variant={button.variant}>{button.label}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
