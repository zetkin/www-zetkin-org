import {
  IconEmail,
  IconGithub,
  IconInstagram,
  IconLink,
  IconLinkedIn,
} from '@/icons/SocialIcons';
import { ImageMedia } from '@/components/Media/ImageMedia';
import { CMSLink as Link } from '@/components/Link';
import Background from './Background';
import { Person } from '@/payload-types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

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

export const Author = ({
  author,
  socialLink,
}: {
  author: string | Person;
  socialLink:
    | ('email' | 'github' | 'linkedIn' | 'instagram' | 'otherLink')[]
    | 'email'
    | 'github'
    | 'linkedIn'
    | 'instagram'
    | 'otherLink'
    | null
    | undefined;
}) => {
  // Normalize to array for easier rendering logic
  const normalizedLinks = socialLink
    ? Array.isArray(socialLink)
      ? socialLink
      : [socialLink]
    : [];

  return (
    <div className="flex gap-3 items-center mb-8! w-full">
      <div className="w-20 h-20 md:w-15 md:h-15 relative rounded-full overflow-clip shrink-0">
        {typeof author === 'object' &&
          'photo' in author &&
          typeof author.photo !== 'string' && (
            <ImageMedia fill resource={author.photo} />
          )}
      </div>

      <div className="relative flex items-center gap-4 px-5 py-4 md:py-2 rounded-[12px] bg-[rgba(15,116,115,0.04)] w-full md:w-fit flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden z-10">
          <p className="text-sm text-[#444444] leading-[1.7] my-0!">Author</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-left text-nowrap truncate text-base font-medium my-0! leading-[1.7] overflow-hidden max-w-full">
                {typeof author === 'object' && 'name' in author
                  ? author.name
                  : author}
              </TooltipTrigger>
              <TooltipContent className="">
                {typeof author === 'object' && 'name' in author
                  ? author.name
                  : author}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-4 shrink-0 z-20">
          {/* ✨ icons container shrink-0 */}
          {normalizedLinks.map((link) => {
            const Icon = icons[link];
            const url =
              typeof author === 'object' && author?.[link]
                ? author[link]
                : undefined;
            return (
              Icon && (
                <Link key={link} url={url}>
                  <Icon color="#444444" height="20" width="20" />
                </Link>
              )
            );
          })}
        </div>
        <Background />
      </div>
    </div>
  );
};
