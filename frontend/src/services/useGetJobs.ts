import { useEffect, useState } from "react";
import { JOBS } from "../constants/api";
import { Job } from "../types/job";

const useGetJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch(JOBS);

      if (response.status === 200) {
        const data = (await response.json()) as Job[];

        setJobs(data);
      }
    }

    fetchJobs();
  }, []);

  return jobs;
};

export default useGetJobs;
