import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function SingleImageRightBottomOverlap({
  subtitle,
  buttons,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-10 z-10 md:w-full md:flex-row-reverse md:max-w-[1000px] md:justify-between scale-x-[-1]">
      <div className="flex flex-col gap-5 text-white md:w-1/2 md:max-w-[350px] sm:justify-between">
        {
          /* eslint-disable react/no-danger */
          <div
            className="text-left scale-x-[-1]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        }
        <div className="flex flex-col gap-5 items-end">
          <p className="text-lg leading-[1.7] font-light text-left md:text-base scale-x-[-1]">
            {subtitle}
          </p>
          <div className="flex gap-4 items-end flex-col sm:flex-row sm:flex-wrap scale-x-[-1]">
            {buttons?.map((button, index) => (
              <Link key={index} url={button.link?.url || ''} >
                <Button
                  className=''
                  variant={
                    button.variant == 'primary' ? 'secondary' : 'outline-white'
                  }
                >
                  {button.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[80vw] md:h-[40vw] md:w-full relative">
        <div className="object-cover absolute h-[70vw] w-[90vw] top-1/12 -left-1/12 md:top-1/50 md:left-auto md:right-1/6 md:w-[65vw] md:max-w-[900px] md:h-[58vw] md:max-h-[598px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover scale-x-[-1]"
              resource={images[0].image}
            />
          )}
        </div>
      </div>
    </div>
  );
}
