import { ImageMedia } from '@/components/Media/ImageMedia';
import { PeopleHighlightBlock as PeopleHighlightBlockProps } from '@/payload-types';
import { CMSLink as Link } from '@/components/Link';

export const PeopleHighlightBlock: React.FC<PeopleHighlightBlockProps> = ({
    people, borderTop
}) => {

    return (
        <div className="flex px-5 w-full justify-center">
            <div className={`flex flex-col md:flex-row md:max-w-250 ${borderTop && "border-t"}`}>
                {people?.map((person, i) => (
                    <div key={i} className='flex flex-col w-full gap-5 first:pb-13 first:border-b last:pt-13 md:first:pr-10 md:first:border-r md:last:pl-10'>
                        <div className='flex gap-8'>
                            <div className='relative w-25 h-25 rounded-full'>
                                <ImageMedia fill resource={person.image} />
                            </div>
                            <h5>
                                {person.quote}
                            </h5>
                        </div>
                        <p>
                            {person.description}
                        </p>
                        <Link url={person.link?.url}>
                            <p>
                                Read the case study
                            </p>
                        </Link>
                    </div>
                ))
                }
            </div>
        </div>
    );
};
