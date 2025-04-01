import { ImageMedia } from '@/components/Media/ImageMedia';
import { Media } from '@/payload-types';

type TwoImgProps = {
  setLightBoxImage: (url: string | null) => void;
  images?: {
    description?: string | undefined;
    image: string | Media;
    id?: string | null;
  }[];
};

export default function TwoImg({ images = [], setLightBoxImage }: TwoImgProps) {
  return (
    <div>
      <div className="h-[92vw] md:h-[70vw] md:max-h-[540px] md:w-full relative">
        <div
          className="object-cover absolute h-[46vw] w-[76vw] -left-1/14 top-0 md:left-auto md:right-[min(30vw,251px)] md:top-0 md:w-[55vw] md:max-w-[375px] md:h-[55vw] md:max-h-[375px]"
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
              <p className="hidden md:inline absolute top-full w-[36vw]! max-w-[340px]! mt-4! text-sm">
                {images[0]?.description}
              </p>
            )}
          </div>
        </div>
        <div
          className="object-cover absolute h-[52vw] w-[83vw] top-7/16 -right-1/12 md:top-[min(40%,158px)] md:right-auto md:left-[min(100vw,277px)] md:w-[55vw] md:max-w-[516px] md:h-[40vw] md:max-h-[344px]"
          onClick={() =>
            images[1]?.image && typeof images[1].image !== 'string'
              ? setLightBoxImage(images[1].image.url ?? null)
              : null
          }
        >
          <div className="flex flex-col">
            {images[1]?.image && (
              <ImageMedia
                fill
                imgClassName="object-cover cursor-pointer"
                resource={images[1].image}
              />
            )}
            {images[1]?.description && (
              <p className="hidden md:inline absolute top-full mt-4! text-sm">
                {images[1]?.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <ol className="text-sm flex flex-col gap-2.5">
        {images[0]?.description && (
          <li className="md:hidden m-0!">{images[0]?.description}</li>
        )}
        {images[1]?.description && (
          <li className="md:hidden m-0!">{images[1]?.description}</li>
        )}
      </ol>
    </div>
  );
}
