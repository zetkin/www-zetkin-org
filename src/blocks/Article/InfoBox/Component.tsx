import RichText from '@/components/RichText';
import type { InfoBoxBlock as InfoBoxBlockProps } from '@/payload-types';
import Background from './Background';

export const InfoBoxBlock: React.FC<InfoBoxBlockProps> = ({ richText }) => {
  return (
    <div className="px-7 py-8 rounded-[4px] bg-[rgba(15,116,115,0.04)] relative w-full md:w-fit">
      {richText && (
        <RichText className="z-20" data={richText} enableGutter={false} />
      )}
      <Background />
    </div>
  );
};
