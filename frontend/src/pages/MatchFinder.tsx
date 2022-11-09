import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TIME_TO_NEXT_CARD } from "../constants/swipe";
import useGetJobs from "../services/useGetJobs";
import * as routes from "../constants/routes";
import MatchFinderCard from "../components/MatchFinderCard";

const MatchFinder: React.FunctionComponent = () => {
  const jobs = useGetJobs();
  const [jobIndex, setJobIndex] = useState(0);
  const navigate = useNavigate();
  const job = jobs[jobIndex];

  const handleRejectedJob = () => {
    setTimeout(() => {
      setJobIndex(jobIndex + 1);
    }, TIME_TO_NEXT_CARD / 2);
  };

  const handleChosenJob = () => {
    navigate(routes.applicantChat, {
      state: job,
    });
  };

  if (!jobs.length) return null;

  return (
    <MatchFinderCard
      job={job}
      onRejectJob={handleRejectedJob}
      onChooseJob={handleChosenJob}
    />
  );
};

export default MatchFinder;
