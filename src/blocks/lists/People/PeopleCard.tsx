import { ImageMedia } from '@/components/Media/ImageMedia';
import {
  IconEmail,
  IconGithub,
  IconInstagram,
  IconLink,
  IconLinkedIn,
} from '@/icons/SocialIcons';
import { Person } from '@/payload-types';
import { CMSLink as Link } from '@/components/Link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import LinkText from './LinkText';

const PeopleCard = ({ person }: { person: Person }) => {
  const anyIcons =
    person.email ||
    person.linkedIn ||
    person.github ||
    person.instagram ||
    person.otherLink;

  return (
    <div
      className={`flex px-5 py-4 gap-5 border-b first:border-t lg:border lg:break-inside-avoid lg:mb-5 lg:rounded-[6px] ${anyIcons ? '' : 'items-center'}`}
    >
      <div className="relative w-[70px] h-[70px] rounded-full overflow-clip">
        <ImageMedia fill resource={person.photo} />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-col lg:gap-0.5">
          <p className="text-xl leading-[1.7]">{person.name}</p>
          <div className="flex gap-2 text-[#444]">
            {person.pronouns && (
              <div className="flex items-center gap-2">
                <p className="leading-[1.7]">{person.pronouns}</p>
                <svg
                  fill="none"
                  height="5"
                  viewBox="0 0 4 5"
                  width="4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.864 4.552C1.52267 4.552 1.208 4.472 0.92 4.312C0.642667 4.14133 0.418667 3.91733 0.248 3.64C0.088 3.352 0.00800002 3.03733 0.00800002 2.696C0.00800002 2.344 0.088 2.02933 0.248 1.752C0.418667 1.47467 0.642667 1.25067 0.92 1.08C1.208 0.909333 1.52267 0.824 1.864 0.824C2.216 0.824 2.53067 0.909333 2.808 1.08C3.08533 1.25067 3.304 1.47467 3.464 1.752C3.63467 2.02933 3.72 2.33867 3.72 2.68C3.72 3.032 3.63467 3.352 3.464 3.64C3.304 3.91733 3.08533 4.14133 2.808 4.312C2.53067 4.472 2.216 4.552 1.864 4.552Z"
                    fill="#444444"
                  />
                </svg>
              </div>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p
                    className={`leading-[1.7] truncate ${person.pronouns ? 'lg:max-w-25' : 'lg:max-w-50'}`}
                  >
                    {person.role}
                  </p>
                </TooltipTrigger>
                <TooltipContent>{person.role}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {anyIcons && (
          <div className="flex gap-5 py-2.5 ">
            {person.email && (
              <Link url={person.email}>
                <IconEmail color="#343434" height="20px" width="20px" />
              </Link>
            )}
            {person.linkedIn && (
              <Link url={person.linkedIn}>
                <IconLinkedIn color="#343434" height="20px" width="20px" />
              </Link>
            )}
            {person.github && (
              <Link url={person.github}>
                <IconGithub color="#343434" height="20px" width="20px" />
              </Link>
            )}
            {person.instagram && (
              <Link url={person.instagram}>
                <IconInstagram color="#343434" height="20px" width="20px" />
              </Link>
            )}
            {person.otherLink && (
              <Link url={person.otherLink}>
                <IconLink color="#343434" height="20px" width="20px" />
              </Link>
            )}
          </div>
        )}

        {person.profilePiece && (
          <Link
            url={
              typeof person.profilePiece === 'object' &&
              'url' in person.profilePiece
                ? (person.profilePiece as unknown as string | undefined)
                : (person.profilePiece as string | undefined)
            }
          >
            <LinkText>Read profile piece</LinkText>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
