import { ImageMedia } from '@/components/Media/ImageMedia';
import { LayoutProps } from './LayoutProps';

export default function FeatureCenter({
  readTime,
  images = [],
  html,
  eyebrowHeading,
  subtitle,
}: LayoutProps) {
  return (
    <div className="flex flex-col w-full md:max-w-250 md:justify-center md:items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        {eyebrowHeading && (
          <p className="text-lg text-center">{eyebrowHeading}</p>
        )}
        {
          /* eslint-disable react/no-danger */
          <div
            className="text-center w-full md:max-w-[750px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        }
        {subtitle && (
          <p className="text-lg text-center mt-1 w-full md:max-w-[550px]">
            {subtitle}
          </p>
        )}
        {readTime && <p className="text-center">{readTime} min read</p>}
      </div>
      <div className="relative block z-0 h-[372px] w-[720px] mt-[-20px] md:mt-[-60px] mb-10 md:h-[50vw] md:max-h-[663px] md:w-[80vw] md:max-w-[1449px]">
        {images[0]?.image && (
          <ImageMedia
            fill
            imgClassName="object-left md:object-center md:object-contain"
            resource={images[0].image}
          />
        )}
      </div>
    </div>
  );
}
