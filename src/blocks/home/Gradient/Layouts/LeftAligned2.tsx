import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import { LayoutProps } from './LayoutProps';
import { CMSLink as Link } from '@/components/Link';

export default function LeftAligned2({
  subtitle,
  buttons,
  images = [],
  html,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-10 z-10 md:w-full md:flex-row md:max-w-[1000px] md:justify-between">
      <div className="flex flex-col gap-5 text-white md:w-full md:max-w-[350px] sm:justify-between">
        {
          /* eslint-disable react/no-danger */
          <div className="" dangerouslySetInnerHTML={{ __html: html }} />
        }
        <div className="flex flex-col gap-5">
          <p className="text-lg leading-[1.7] font-light md:text-base">
            {subtitle}
          </p>
          <div className="flex gap-4">
            {buttons?.map((button, index) => (
              <Link key={index} url={button.link?.url || ''}>
                <Button variant={button.variant == 'primary' ? 'secondary' : 'outline-white' }>{button.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[105vw] md:h-[40vw] md:w-full relative">
        <div className="object-cover absolute h-[44vw] w-[82vw] -right-1/14 top-1/24 md:left-auto md:top-0 md:right-[min(-66px,-10%)] md:w-[42vw] md:max-w-[456px] md:h-[35vw] md:max-h-[273px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[47vw] w-[53vw] top-8/15 -left-1/12 md:top-[min(100%,353px)] md:left-[min(10%,140px)] md:w-[25vw] md:max-w-[239px] md:h-[25vw] md:max-h-[239px]">
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
