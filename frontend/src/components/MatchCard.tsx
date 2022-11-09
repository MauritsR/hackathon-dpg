import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swipe from "./Swipe";
import type { Job } from "../types/job";

type MatchCardProps = {
  job: Job;
};

const MatchCard: React.FunctionComponent<MatchCardProps> = ({ job }) => {
  return (
    <Swipe>
      <Card
        sx={{
          cursor: "grab",
          willChange: "transform",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={job.photo}
          alt="job photo"
          sx={{
            pointerEvents: "none",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {job.jobTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.description}
          </Typography>
        </CardContent>
      </Card>
    </Swipe>
  );
};

export default MatchCard;
