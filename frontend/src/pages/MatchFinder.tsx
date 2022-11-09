import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MatchCard from "../components/MatchCard";
import { TIME_TO_NEXT_CARD } from "../constants/swipe";
import useGetJobs from "../services/useGetJobs";
import * as routes from "../constants/routes";

const MatchFinder: React.FunctionComponent = () => {
  const jobs = useGetJobs();
  const [jobIndex, setJobIndex] = useState(0);
  const navigate = useNavigate();

  const handleRejectedJob = () => {
    setTimeout(() => {
      setJobIndex(jobIndex + 1);
    }, TIME_TO_NEXT_CARD / 2);
  };

  const handleChosenJob = () => {
    navigate(routes.applicantChat);
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
