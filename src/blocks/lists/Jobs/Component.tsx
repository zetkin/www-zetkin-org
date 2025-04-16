import { headers } from 'next/headers';

import { Job, JobsListBlock as JobsListProps } from '@/payload-types';
import { fetchJobsByTag } from './fetchJobsByTag';
import { CMSLink as Link } from '@/components/Link';
import ArrowRight from './ArrowRight';

const JobsListBlock: React.FC<JobsListProps> = async ({ title, jobsTag }) => {
  const headersList = await headers();
  const currentPath =
    headersList.get('x-invoke-path') ||
    headersList.get('referer')?.split(headersList.get('host') ?? '')[1] ||
    '';

  return (
    <div className="flex lg:px-5 w-full justify-center mt-20">
      <div className="w-full lg:max-w-250 px-5">
        <h5 className="text-lg sm:text-xl">{title}</h5>
        <div className="flex flex-col w-full mt-4">
          {jobsTag && typeof jobsTag === 'string' ? (
            (await fetchJobsByTag(jobsTag)).docs.map((job: Job) => (
              <Link
                key={job.id}
                className="flex justify-between w-full items-center border-b last:border-b-0 py-4 cursor-pointer"
                url={`${currentPath}/job/${job.id}`}
              >
                <div className="flex flex-col gap-1">
                  <p className="leading-[170%]">{job.title}</p>
                  <div className="text-[15px] text-[#646464]">
                    {job.remote ? (
                      <p className="leading-[170%]">Remote</p>
                    ) : (
                      <p className="leading-[170%]">{job.city}</p>
                    )}
                  </div>
                </div>
                <ArrowRight />
              </Link>
            ))
          ) : (
            <div>No jobs found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsListBlock;
