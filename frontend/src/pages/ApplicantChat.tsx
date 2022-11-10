import { useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import MatchCard from "../components/MatchCard";
import { Job } from "../types/job";
import useChat from "../services/useChat";
import ChatMessages from "../components/ChatMessages";
import TextField from "@mui/material/TextField";

const ApplicantChat = () => {
  const location = useLocation();
  const job = location.state as Job;
  const messages = useChat({
    localUser: {
      name: "Gebruiker",
    },
    remoteUser: {
      name: job.company,
      avatar: job.logo,
    },
  });

  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      <MatchCard job={job} />
      <ChatMessages messages={messages} />
      <TextField
        sx={{ width: "100%" }}
        variant="outlined"
        placeholder="Typ hier je tekst"
      />
    </Paper>
  );
};

export default ApplicantChat;
