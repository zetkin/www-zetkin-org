import { getPayload } from 'payload';

import configPromise from '@payload-config';
import RichText from '@/components/RichText';
import { Button } from '@/components/ui/button';
import { CMSLink as Link } from '@/components/Link';

export default async function JobPage({ id }: { id: string }) {
  const payload = await getPayload({ config: configPromise });

  const jobData = await payload.find({
    collection: 'jobs',
    where: {
      id: {
        equals: id,
      },
    },
  });

  const jobDoc = jobData.docs[0];

  const color = 'purple';

  return (
    <div className="pt-10 sm:pt-46 pb-24 px-5 flex justify-center">
      <div className="w-full sm:max-w-[630px] pr-20">
        {jobDoc ? (
          <div>
            <div className="flex flex-col gap-4 border-b pb-5">
              <h3 className="sm:text-[28px]">{jobDoc.title}</h3>
              <div className="flex gap-3 items-center">
                <p className="text-lg">
                  {jobDoc.remote ? 'Remote' : jobDoc.city}
                </p>
                <svg
                  height="4"
                  viewBox="0 0 3 4"
                  width="3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.9917 2.375C2.9917 2.56543 2.95508 2.74609 2.88184 2.91699C2.80859 3.08301 2.70605 3.22949 2.57422 3.35645C2.44727 3.4834 2.29834 3.5835 2.12744 3.65674C1.95654 3.72998 1.77344 3.7666 1.57812 3.7666C1.3877 3.7666 1.20703 3.72998 1.03613 3.65674C0.870117 3.5835 0.723633 3.4834 0.59668 3.35645C0.469727 3.22949 0.369629 3.08301 0.296387 2.91699C0.223145 2.74609 0.186523 2.56543 0.186523 2.375C0.186523 2.17969 0.223145 1.99658 0.296387 1.82568C0.369629 1.65479 0.469727 1.50586 0.59668 1.37891C0.723633 1.25195 0.870117 1.15186 1.03613 1.07861C1.20703 1.00049 1.3877 0.961426 1.57812 0.961426C1.77344 0.961426 1.95654 1.00049 2.12744 1.07861C2.29834 1.15186 2.44727 1.25195 2.57422 1.37891C2.70605 1.50586 2.80859 1.65479 2.88184 1.82568C2.95508 1.99658 2.9917 2.17969 2.9917 2.375Z" />
                </svg>
                {jobDoc.employmentType && (
                  <p className="text-lg">{jobDoc.employmentType}</p>
                )}
              </div>
            </div>
            <RichText
              className={`mt-1 w-full overflow-visible text-lg leading-[170%] prose-p:text-black prose-ol:text-black marker:text-black prose-a:text-z-${color}`}
              data={
                jobDoc.description || {
                  root: {
                    type: 'root',
                    children: [],
                    direction: null,
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                }
              }
              enableGutter={false}
            />
            <Link newTab={true} url={jobDoc.applyLink}>
              <Button className="mt-10" variant={'primary'}>
                Apply
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-5 h-150 justify-center">
            <h3>No job found.</h3>
            <p className="text-center">
              No job was found with the provided ID. Please check the url and
              try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
