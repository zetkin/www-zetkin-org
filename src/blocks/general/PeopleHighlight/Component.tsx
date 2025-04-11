import { ImageMedia } from '@/components/Media/ImageMedia';
import { PeopleHighlightBlock as PeopleHighlightBlockProps } from '@/payload-types';
import { CMSLink as Link } from '@/components/Link';
import LinkText from './LinkText';

export const PeopleHighlightBlock: React.FC<PeopleHighlightBlockProps> = ({
  people,
}) => {
  return (
    <div className="flex px-5 w-full justify-center">
      <div className={`flex flex-col md:flex-row md:max-w-250`}>
        {people?.map((person, i) => (
          <div
            key={i}
            className="flex flex-col w-full gap-5 first:pb-13 first:border-b last:pt-13 md:first:pb-0 md:first:border-b-0 md:last:pt-0 md:first:pr-10 md:first:border-r md:last:pl-10"
          >
            <div className="flex gap-8 items-center">
              <div className="relative block w-25 h-25 rounded-full overflow-clip">
                <ImageMedia fill resource={person.image} />
              </div>
              <h5 className="flex-1 md:text-2xl leading-[1.7]">
                {person.quote}
              </h5>
            </div>
            <p className="leading-[1.7] text-lg">{person.description}</p>
            <Link url={person.link?.url}>
              <LinkText>Read the case study</LinkText>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
