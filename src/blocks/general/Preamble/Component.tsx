import { PreambleBlock as PreambleBlockProps } from '@/payload-types';
import LongHeaderNText from './Layouts/LongHeader&Text';
import LongPreambleNText from './Layouts/LongPreamble&Text';
import PreambleOnly from './Layouts/PreambleOnly';
import PreambleNImage from './Layouts/Preamble&Image';
import PreambleHeaderTextNImage from './Layouts/PreambleHeaderText&Image';

const preambles = {
  longHeaderNText: LongHeaderNText,
  longPreambleNText: LongPreambleNText,
  preambleOnly: PreambleOnly,
  preambleHeaderTextNImage: PreambleHeaderTextNImage,
  preambleNImage: PreambleNImage,
};

export const PreambleBlock: React.FC<PreambleBlockProps> = ({
  layout,
  header,
  preamble,
  mainText,
  image,
  width,
}) => {
  if (!layout) {
    return null;
  }

  const PreambleToRender = preambles[layout];

  if (!PreambleToRender) {
    return null;
  }

  return (
    <div className="flex px-5 mt-10 w-full justify-center">
      <PreambleToRender
        header={header || undefined}
        image={image || undefined}
        mainText={mainText || undefined}
        preamble={preamble || undefined}
        width={width || undefined}
      />
    </div>
  );
};
