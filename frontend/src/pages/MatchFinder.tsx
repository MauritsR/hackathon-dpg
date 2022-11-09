import { useState } from "react";
import MatchCard from "../components/MatchCard";
import { TIME_TO_NEXT_CARD } from "../constants/swipe";
import useGetJobs from "../services/useGetJobs";

const MatchFinder: React.FunctionComponent = () => {
  const jobs = useGetJobs();
  const [jobIndex, setJobIndex] = useState(0);

  const handleRejectedJob = () => {
    setTimeout(() => {
      setJobIndex(jobIndex + 1);
    }, TIME_TO_NEXT_CARD);
  };

  const handleChosenJob = () => {
    console.log("handle chosen job");
  };

  if (!jobs.length) return null;

  const job = jobs[jobIndex];

  return (
    <MatchCard
      job={{ ...job }}
      onRejectJob={handleRejectedJob}
      onChooseJob={handleChosenJob}
    />
  );
};

export default MatchFinder;
