import { Person } from '@/payload-types';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PeopleCard from './PeopleCard';
import { fetchPeopleByTag } from './fetchPeopleByTag';

const PeopleAccordionItem = async ({
  title,
  peopleTag,
}: {
  title: string;
  peopleTag: string;
}) => {
  const peopleData = await fetchPeopleByTag(peopleTag);

  return (
    <AccordionItem className="border-b-0" value={title || 'default-title'}>
      <AccordionTrigger className="[&[data-state=open]]:border-b-0! [&[data-state=closed]]:border-b! lg:border-t-0! px-5 lg:px-0">
        <p className="text-[22px]">{title}</p>
      </AccordionTrigger>
      <AccordionContent className="w-full flex flex-col lg:block lg:columns-3 lg:gap-x-6 lg:border-b-0! lg:pb-0">
        {peopleData.docs.map((person: Person, i) => (
          <PeopleCard key={i} person={person} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default PeopleAccordionItem;
