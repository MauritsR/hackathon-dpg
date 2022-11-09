import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import type { Job } from "../types/job";

type MatchCardProps = {
  job: Job;
};

const Image = styled.img`
  height: fit-content;
  width: 100px;
`;

const MatchCard = React.forwardRef<HTMLDivElement, MatchCardProps>(
  ({ job }, ref) => {
    return (
      <div ref={ref}>
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
            <Stack direction="row" justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                {job.jobTitle}
              </Typography>
              <Image src={job.logo} alt="logo" />
            </Stack>
            <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
              {job.description}
            </Typography>
            <Chip sx={{ mt: 1, mr: 1 }} label={job.location} />
            <Chip sx={{ mt: 1 }} label={job.company} variant="outlined" />
          </CardContent>
        </Card>
      </div>
    );
  }
);

export default MatchCard;
