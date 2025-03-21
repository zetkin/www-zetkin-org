import { Button } from '@/components/ui/button';
import { LandingBlock as LandingBlockProps } from '@/payload-types';
import Arrow from './Arrow';

export const LandingBlock: React.FC<LandingBlockProps> = (props) => {
  const { leftTitle, rightTitle, subtitle, buttons = [] } = props;

  return (
    <div className="flex justify-center items-center px-5 w-full relative pb-20 sm:pt-30 sm:pb-32 sm:min-h-[80vh]">
      <div className="flex flex-col gap-12 w-full sm:max-w-[1000px]">
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-12">
          <h1 className="w-full sm:text-[8vw] lg:text-[5rem]">{leftTitle}</h1>
          <h1 className="text-right srf-h1 sm:mt-26 sm:text-[8vw] lg:text-[5.125rem]">
            {rightTitle}
          </h1>
        </div>
        <div className="flex flex-col gap-7 items-end sm:gap-8 sm:w-full">
          <p className="text-lg text-right leading-[1.7] sm:w-1/2">
            {subtitle}
          </p>
          <div className="flex gap-4">
            {buttons &&
              buttons.map((button, index) => {
                return (
                  <Button key={index} variant={button.variant}>
                    {button.label}
                  </Button>
                );
              })}
          </div>
        </div>
      </div>
      <Arrow />
    </div>
  );
};
