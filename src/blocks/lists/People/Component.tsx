import { getPayload } from 'payload';

import configPromise from '@payload-config';
import { PeopleListBlock as PeopleListProps, Person } from '@/payload-types';

const PeopleListBlock: React.FC<PeopleListProps> = async ({ peopleCategory }) => {

    const payload = await getPayload({ config: configPromise });

    const peopleData = await payload.find({
        collection: 'people',
        where: {
            category: {
                equals: peopleCategory
            }
        }
    });

    return (
        <div className="flex px-5 w-full justify-center mt-20">
            <div className='w-200'>
                
                {
                    peopleData.docs.map((person: Person) => (
                        <div key={person.id}>
                            <p>{person.name}</p>
                            <p>{person.role}</p>
                        </div>
                    ))

                }
            </div>
        </div>
    )
};

export default PeopleListBlock;
