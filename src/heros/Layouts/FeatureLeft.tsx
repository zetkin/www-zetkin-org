import { ImageMedia } from '@/components/Media/ImageMedia';
import { LayoutProps } from './LayoutProps';

export default function FeatureLeft({
  readTime,
  images = [],
  html,
  eyebrowHeading,
  subtitle
}: LayoutProps) {
  return (
    <div className="flex flex-col w-full gap-12 md:max-w-250">
      <div className="flex flex-col gap-4 ">
        {eyebrowHeading && <p className="text-lg">{eyebrowHeading}</p>}
        {
          /* eslint-disable react/no-danger */
          <div className="w-full md:max-w-[750px]" dangerouslySetInnerHTML={{ __html: html }} />
        }
        {subtitle && <p className="text-lg mt-1 w-full md:w-[550px]">{subtitle}</p>}
        {readTime && <p>{readTime} min read</p>}
      </div>
      <div className="relative block z-0 h-[372px] w-[720px] -mt-25 md:ml-[0px] lg:ml-[-40px] xl:ml-[-100px] md:-mt-20 lg:-mt-30 md:h-[50vw] md:max-h-[663px] md:w-[95vw] md:max-w-[1300px] ">
        {images[0]?.image && (
          <ImageMedia
            fill
            imgClassName="object-contain object-left md:object-center "
            resource={images[0].image}
          />
        )}
      </div>
    </div>
  );
}
