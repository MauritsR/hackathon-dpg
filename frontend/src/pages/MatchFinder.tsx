import MatchCard from "../components/MatchCard";
import useGetJobs from "../services/useGetJobs";

const MatchFinder = () => {
  const jobs = useGetJobs();

  if (!jobs.length) return null;

  const job = jobs[0];

  return (
    <div>
      <h2>Match finder view</h2>
      <MatchCard job={job} />
    </div>
  );
};

export default MatchFinder;
