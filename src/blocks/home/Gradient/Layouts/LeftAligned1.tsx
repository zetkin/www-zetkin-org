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
                <Button variant={'secondary'}>{button.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[105vw] md:h-[40vw] md:w-full relative">
        <div className="object-cover absolute h-[45vw] w-[82vw] -left-1/12 md:z-10 md:left-auto md:top-[min(369px,50%)] md:right-[-115px] md:w-[45vw] md:max-w-[485px] md:h-[20vw] md:max-h-[241px]">
          {images[0]?.image && (
            <ImageMedia
              fill
              imgClassName="object-cover"
              resource={images[0].image}
            />
          )}
        </div>
        <div className="object-cover absolute h-[70vw] w-[50vw] top-8/21 left-5/14 md:z-0  md:top-0 md:left-[min(5%,60px)] md:w-[35vw] md:max-w-[295px] md:h-[52vw] md:max-h-[442px]">
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
