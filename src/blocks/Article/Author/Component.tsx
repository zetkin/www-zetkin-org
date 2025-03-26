import {
  IconEmail,
  IconGithub,
  IconInstagram,
  IconLink,
  IconLinkedIn,
} from '@/components/Icons';
import { ImageMedia } from '@/components/Media/ImageMedia';
import type { AuthorBlock as AuthorBlockProps } from '@/payload-types';
import { CMSLink as Link } from '@/components/Link';

const icons: Record<
  string,
  React.FC<{ width: string; height: string; color?: string }>
> = {
  instagram: IconInstagram,
  github: IconGithub,
  email: IconEmail,
  linkedIn: IconLinkedIn,
  otherLink: IconLink,
};

export const AuthorBlock: React.FC<AuthorBlockProps> = ({
  author,
  socialLink,
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

  const IconToRender = socialLink ? icons[socialLink] : undefined;

  return (
    <div className="flex gap-3 items-center mb-8!">
      <div className="w-20 h-20 md:w-15 md:h-15 relative rounded-full overflow-clip">
        {typeof author === 'object' &&
          'photo' in author &&
          typeof author.photo !== 'string' && (
            <ImageMedia fill resource={author.photo} />
          )}
      </div>
      <div className="flex gap-2.5 justify-between items-center px-5 py-4 md:py-2 rounded-[12px] bg-[rgba(15,116,115,0.04)] relative w-full md:w-fit flex-1">
        <div className="flex flex-col z-20">
          <p className="md:text-sm text-[#444444] leading-[1.7] my-0!">
            Author
          </p>
          <p className="text-lg md:text-base font-medium my-0! leading-[1.7]">
            {typeof author === 'object' && 'name' in author
              ? author.name
              : author}
          </p>
        </div>
        {typeof author === 'object' && socialLink && socialLink in author && (
          <Link className="z-20" url={author[socialLink]}>
            {IconToRender && (
              <IconToRender color="#444444" height="20" width="20" />
            )}
          </Link>
        )}
        <div
          className={`absolute w-full h-full rounded-[12px] top-0 left-0 z-10 ${bgTailwind}`}
        />
      </div>
    </div>
  );
};
