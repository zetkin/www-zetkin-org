import { PreambleArticleBlock as PreambleBlockProps } from '@/payload-types';

export const PreambleArticleBlock: React.FC<PreambleBlockProps> = ({
  preamble,
}) => {
  return (
    <div className="w-full md:max-w-[550px] md:mr-20">
      {preamble && <h6 className="md:mr-20">{preamble}</h6>}
    </div>
  );
};
