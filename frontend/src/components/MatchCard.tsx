import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Swipe from "./Swipe";
import type { Job } from "../types/job";
import { useEffect } from "react";

type MatchCardProps = {
  job: Job;
  onRejectJob: () => void;
  onChooseJob: () => void;
};

const MatchCard: React.FunctionComponent<MatchCardProps> = ({
  job,
  onRejectJob,
  onChooseJob,
}) => {
  return (
    <Swipe onSwipeLeft={onRejectJob} onSwipeRight={onChooseJob}>
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
        <CardContent
          sx={{
            pointerEvents: "none",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {job.jobTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.description}
          </Typography>
          <Chip sx={{ mt: 1, mr: 1 }} label={job.location} />
          <Chip sx={{ mt: 1 }} label={job.company} variant="outlined" />
        </CardContent>
      </Card>
    </Swipe>
  );
};

export default MatchCard;
