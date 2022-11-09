import { Job } from "../types/job";
import MatchCard from "./MatchCard";
import Swipe from "./Swipe";

type MatchFinderCardProps = {
  job: Job;
  onRejectJob: () => void;
  onChooseJob: () => void;
};

const MatchFinderCard: React.FunctionComponent<MatchFinderCardProps> = ({
  job,
  onChooseJob,
  onRejectJob,
}) => {
  return (
    <Swipe onSwipeLeft={onRejectJob} onSwipeRight={onChooseJob}>
      <MatchCard job={job} />
    </Swipe>
  );
};

export default MatchFinderCard;
