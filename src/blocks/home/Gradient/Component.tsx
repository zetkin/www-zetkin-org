'use client';

import RichText from '@/components/RichText';
import { Button } from '@/components/ui/button';
import { GradientBlock as GradientBlockProps } from '@/payload-types';

export const GradientBlock: React.FC<GradientBlockProps> = (props) => {
  const { title, layout, subtitle, buttons, images = [] } = props;

  return (
    <div className="flex justify-center items-center px-5 w-full sm:pt-30 sm:pb-32 sm:min-h-[80vh]">
      {title && <RichText data={title} enableGutter={false} />}
      <Button variant="primary">Primary Button</Button>
    </div>
  );
};
