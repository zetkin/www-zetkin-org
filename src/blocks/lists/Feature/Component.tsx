import { FeatureListBlock as FeatureListProps } from '@/payload-types';
import { IconArrowRight } from '@/icons/UIIcons';
import FeatureListBlockClient from './Component.client';

const FeatureListBlock: React.FC<FeatureListProps> = ({
  header,
  subHeader,
  accentColor,
  features,
}) => {
  return (
    <div className="flex px-5 w-full justify-center mt-20">
      <div className="flex flex-col gap-12 w-full md:max-w-250 relative">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2.5 items-center md:gap-3">
            <h2 className="text-3xl md:text-4xl leading-[1.2] font-medium">
              {header}
            </h2>
            <IconArrowRight
              iconClasses={`stroke-z-${accentColor || 'purple'} h-[30px] w-[30px] md:h-[36px] md:w-[36px]`}
            />
          </div>
          <p className="text-lg leading-[1.7] font-light md:max-w-[440px]">
            {subHeader}
          </p>
        </div>
        {/* Client Component: handles dynamic behavior like scroll animations and sidebar */}
        <FeatureListBlockClient
          accentColor={accentColor}
          blockType="featureList"
          features={features}
        />
      </div>
    </div>
  );
};

export default FeatureListBlock;
