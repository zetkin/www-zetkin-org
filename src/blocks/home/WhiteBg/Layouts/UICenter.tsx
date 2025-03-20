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
      <div className="flex flex-col w-full justify-center sm:items-center">
        <div className="flex flex-col gap-4 sm:max-w-[450px] z-10">
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
        <div className="relative block z-0 h-[372px] w-[720px] mt-[-20px] mb-10 sm:mt-2 lg:h-[50vw] lg:max-h-[663px] lg:w-[80vw] lg:max-w-[1449px] lg:mt-[-20px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-left md:object-center lg:object-contain"
              resource={images[0].image}
            />
          )}
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
