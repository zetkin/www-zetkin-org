import { PeopleListBlock as PeopleListProps } from '@/payload-types';
import { Accordion } from '@/components/ui/accordion';
import PeopleAccordionItem from './PeopleAccordionItem';
import { fetchPeopleByTag } from './fetchPeopleByTag';
import PeopleCard from './PeopleCard';

const PeopleListBlock: React.FC<PeopleListProps> = async ({
  lists,
  accordion,
}) => {
  return (
    <div className="flex lg:px-5 w-full justify-center mt-20">
      <div className="w-full lg:max-w-250">
        {accordion ? (
          <Accordion
            collapsible
            defaultValue={lists?.[0]?.title ?? ''}
            type="single"
          >
            {lists?.map((list, i) => (
              <PeopleAccordionItem
                key={i}
                peopleTag={
                  typeof list.peopleTag === 'string'
                    ? list.peopleTag
                    : (list.peopleTag?.toString() ?? '')
                }
                title={list.title ?? ''}
              />
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="text-[22px] px-5 lg:px-0">
              {lists?.[0]?.title ?? 'People'}
            </h3>
            <div className="flex flex-col lg:block lg:columns-3 lg:gap-x-6">
              {lists &&
              lists[0]?.peopleTag &&
              typeof lists[0].peopleTag === 'string' ? (
                (await fetchPeopleByTag(lists[0].peopleTag)).docs.map(
                  (person) => (
                    <PeopleCard
                      key={person.id}
                      person={person}
                    />
                  ),
                )
              ) : (
                <div>No people found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleListBlock;
