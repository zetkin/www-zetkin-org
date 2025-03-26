import { ImageMedia } from '@/components/Media/ImageMedia';
import { Media } from '@/payload-types';

type OneImgProps = {
    desktopOverflow: boolean;
    mobileOverflow: string;
    setLightBoxImage: (url: string | null) => void;
    images?: {
        description?: string | undefined;
        image: string | Media;
        id?: string | null;
    }[];
};

export default function OneImg({
    images = [],
    setLightBoxImage,
    mobileOverflow,
    desktopOverflow,
}: OneImgProps) {
    return (
        <div>
            <div className="h-[92vw] md:h-[70vw] md:max-h-[651px] md:w-full relative -ml-5 -mr-5 md:ml-0 md:mr-0">
                <div
                    className={`object-cover absolute h-[75vw] w-[90vw] top-0 md:-left-[min(0vw,50px)]  md:top-0
                            ${mobileOverflow === 'right' && 'right-0'}
                            ${desktopOverflow ? 'lg:-left-[min(12vw,250px)] md:w-[85vw] md:max-w-[1400px] md:h-[55vw] md:max-h-[650px]' : 'lg:-left-[min(6vw,150px)] md:w-[85vw] md:max-w-[975px] md:h-[55vw] md:max-h-[569px]'}
                        `}
                    onClick={() =>
                        images[0]?.image && typeof images[0].image !== 'string'
                            ? setLightBoxImage(images[0].image.url ?? null)
                            : null
                    }
                >
                    <div className="flex flex-col">
                        {images[0]?.image && (
                            <ImageMedia
                                fill
                                imgClassName="object-cover cursor-pointer"
                                resource={images[0].image}
                            />
                        )}
                        {images[0]?.description && (
                            <p
                                className={`absolute top-full w-full mt-4! text-sm
                                ${mobileOverflow === 'left' ? 'pl-5 md:pl-0' : 'pr-5 md:pr-0'}
                                `}
                            >
                                {images[0]?.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
