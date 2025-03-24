import { PreambleBlock as PreambleBlockProps } from '@/payload-types';
import LongHeaderNText from './Layouts/LongHeader&Text';
import LongPreambleNText from './Layouts/LongPreamble&Text';
import PreambleOnly from './Layouts/PreambleOnly';


const preambles = {
    longHeaderNText: LongHeaderNText,
    longPreambleNText: LongPreambleNText,
    preambleOnly: PreambleOnly,
    preambleHeaderTextNImage: LongHeaderNText,
    preambleNImage: LongHeaderNText,
}

export const PreambleBlock: React.FC<PreambleBlockProps> = ({
    layout,
    header,
    preamble,
    mainText,
    image
}) => {
    if (!layout) {
        return null;
    }

    const PreambleToRender = preambles[layout];

    if (!PreambleToRender) {
        return null;
    }

    return (
        <div className="flex px-5 mt-5 w-full justify-center">
            <PreambleToRender
                header={header || undefined}
                image={image || undefined}
                mainText={mainText || undefined}
                preamble={preamble || undefined}
            />
        </div>
    );
};
