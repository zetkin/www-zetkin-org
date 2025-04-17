import { Job, JobsListBlock as JobsListProps } from '@/payload-types';
import { fetchJobsByTag } from './fetchJobsByTag';
import JobItem from './JobItem';

const JobsListBlock: React.FC<JobsListProps> = async ({ title, jobsTag }) => {
  return (
    <div className="flex lg:px-5 w-full justify-center mt-20">
      <div className="w-full lg:max-w-250 px-5">
        <h5 className="text-lg sm:text-xl">{title}</h5>
        <div className="flex flex-col w-full mt-4">
          {jobsTag && typeof jobsTag === 'string' ? (
            (await fetchJobsByTag(jobsTag)).docs.map((job: Job) => (
              <JobItem
                key={job.id}
                id={job.id}
                location={job.location}
                title={job.title}
              />
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
