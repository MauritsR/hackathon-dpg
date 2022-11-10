import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import type { Job } from "../types/job";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CelebrationOutlined from "@mui/icons-material/CelebrationOutlined";
import MopedOutlined from "@mui/icons-material/MopedOutlined";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";

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
            boxShadow: 4,
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={job.photo}
            alt="job photo"
            sx={{
              height: "100%",
              pointerEvents: "none",
            }}
          />
          <CardContent
            sx={{
              pointerEvents: "none",
              height: "100%",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                {job.jobTitle}
              </Typography>
              <Image src={job.logo} alt="logo" />
            </Stack>

            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CelebrationOutlined sx={{ color: job.primaryColor }} />
                </ListItemIcon>
                <ListItemText primary={job.jobCharacteristic1} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MopedOutlined sx={{ color: job.primaryColor }} />
                </ListItemIcon>
                <ListItemText primary={job.jobCharacteristic2} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ThumbUpOutlined sx={{ color: job.primaryColor }} />
                </ListItemIcon>
                <ListItemText primary={job.jobCharacteristic3} />
              </ListItem>
            </List>
            <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
              {job.description}
            </Typography>
            <Chip
              sx={{
                mt: 1,
                mr: 1,
                backgroundColor: job.primaryColor,
                color: "white",
              }}
              label={job.location}
            />
            <Chip sx={{ mt: 1 }} label={job.company} variant="outlined" />
          </CardContent>
        </Card>
      </div>
    );
  }
);

export default MatchCard;
