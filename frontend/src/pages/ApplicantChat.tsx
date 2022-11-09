import { useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import MatchCard from "../components/MatchCard";
import { Job } from "../types/job";
import useChat from "../services/useChat";
import ChatMessages from "../components/ChatMessages";

const ApplicantChat = () => {
  const location = useLocation();
  const job = location.state as Job;
  const messages = useChat({
    user: "User",
    job,
  });

  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      <MatchCard job={job} />
      <ChatMessages messages={messages} />
    </Paper>
  );
};

export default ApplicantChat;
