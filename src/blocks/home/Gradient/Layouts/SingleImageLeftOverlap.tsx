import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function SingleImageLeftOverlap({
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
        <div className="object-cover absolute h-[70vw] w-[90vw] top-1/12 -left-1/12 md:top-1/50 md:left-auto md:right-1/6 md:w-[65vw] md:max-w-[900px] md:h-[50vw] md:max-h-[450px]">
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
