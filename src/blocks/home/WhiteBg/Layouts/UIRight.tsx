import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function UICenter({
  subtitle,
  buttons,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-10 z-10 w-full md:max-w-[1000px] items-start ">
      <div className="flex flex-col w-full sm:items-center">
        <div className="flex flex-col gap-7 w-full">
          <div className="flex flex-col gap-4 md:max-w-[450px] z-10">
            {
              /* eslint-disable react/no-danger */
              <div
                className="w-full group"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            }
            <p className="text-lg leading-[1.7] font-light w-full">
              {subtitle}
            </p>
          </div>
          <div className="flex gap-5 w-full">
            {buttons?.map((button, index) => (
              <Link key={index} url={button.link?.url || ''}>
                <Button variant={button.variant}>{button.label}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative block z-0 h-[372px] w-[720px] -mt-5 md:-mt-15 md:h-[50vw] md:max-h-[663px] md:w-[95vw] md:max-w-[1449px] ">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-contain object-left md:object-center "
              resource={images[0].image}
            />
          )}
        </div>
      </div>
    </div>
  );
}
