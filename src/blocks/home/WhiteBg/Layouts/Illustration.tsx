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
    <div className="flex flex-col z-10 gap-10 md:w-full md:flex-row-reverse md:max-w-[1000px] md:justify-between scale-x-[-1]">
      <div className="w-[35vw] max-w-[440px] h-auto relative hidden md:block">
        {images[0]?.image && (
          <ImageMedia
            fill
            imgClassName="object-contain scale-x-[-1]"
            resource={images[0].image}
          />
        )}
      </div>
      <div className="flex flex-col md:justify-around w-full">
        <div className="flex flex-col gap-4 w-full">
          {
            /* eslint-disable react/no-danger */
            <div
              className="group larger-text scale-x-[-1] text-center md:text-right"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          }
          <div className="w-full h-[500px] relative md:hidden">
            {images[0]?.image && (
              <ImageMedia
                fill
                imgClassName="object-contain scale-x-[-1]"
                resource={images[0].image}
              />
            )}
          </div>
          <div className="flex flex-col gap-8 items-center md:items-start">
            <p className="text-lg leading-[1.7] font-light md:text-base md:max-w-[450px] scale-x-[-1] text-center md:text-right">
              {subtitle}
            </p>
            <div className="flex flex-col gap-4 scale-x-[-1] justify-center items-center md:flex-row md:items-end">
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
