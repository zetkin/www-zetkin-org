import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function RightAligned1({
  subtitle,
  buttons,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-10 z-10 md:w-full md:flex-row-reverse md:max-w-[1000px] md:justify-between">
      <div className="flex flex-col gap-5 text-white md:w-1/2 md:max-w-[350px] sm:justify-between">
        {
          /* eslint-disable react/no-danger */
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        }
        <div className="flex flex-col gap-5 items-end">
          <p className="text-lg leading-[1.7] font-light text-right md:text-base">
            {subtitle}
          </p>
          <div className="flex gap-4 items-end">
            {buttons?.map((button, index) => (
              <Link key={index} url={button.link?.url || ''}>
                <Button variant={'secondary'}>{button.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[80vw] md:h-[40vw] md:w-full relative">
        <div className="object-cover absolute h-[50vw] w-[70vw] -left-1/12 md:w-[45vw] md:h-[30vw] md:max-w-[385px] md:max-h-[293px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[45vw] w-[70vw] top-1/2 left-2/7 md:w-[40vw] md:h-[30vw] md:max-w-[346px] md:max-h-[230px] md:top-[min(50%,220px)] md:left-[min(30%,217px)]">
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
