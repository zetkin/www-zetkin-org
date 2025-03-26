import RichText from '@/components/RichText';
import type { InfoBoxBlock as InfoBoxBlockProps } from '@/payload-types';

export const InfoBoxBlock: React.FC<InfoBoxBlockProps> = ({
  richText,
  backgroundColor,
}) => {
  let bgTailwind;

  if (backgroundColor === 'greenPurple') {
    bgTailwind =
      'bg-gradient-to-r from-[rgba(120,1,221,0)] from-5.08% via-[rgba(120,1,221,0.03)] via-27.63% via-[rgba(120,1,221,0.06)] via-57.2% to-[rgba(120,1,221,0.05)] to-84.63%';
  } else if (backgroundColor === 'greenRed') {
    bgTailwind =
      'bg-gradient-to-r from-[rgba(201,30,64,0)] from-5.08% via-[rgba(201,30,64,0.03)] via-27.63% via-[rgba(201,30,64,0.06)] via-57.2% to-[rgba(201,30,64,0.05)] to-84.63%';
  }

  return (
    <div className="px-7 py-8 rounded-[4px] bg-[rgba(15,116,115,0.04)] relative w-full md:w-fit">
      {richText && (
        <RichText className="z-20" data={richText} enableGutter={false} />
      )}
      <div
        className={`absolute w-full h-full rounded-[4px] top-0 left-0 z-10 ${bgTailwind}`}
      />
    </div>
  );
};
