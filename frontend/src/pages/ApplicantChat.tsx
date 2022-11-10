import { useEffect, useState } from "react";
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
  const [input, setInput] = useState("");
  const { messages, sendMessage, setJob } = useChat({
    localUser: {
      name: "applicant",
    },
    remoteUser: {
      name: job.company,
      avatar: job.logo,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setJob(job.id);
    }, 50);
  }, [job.id, setJob]);

  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      <MatchCard job={job} />
      <ChatMessages messages={messages} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(input);
          setInput("");
        }}
      >
        <TextField
          onChange={(event) => setInput(event.target.value)}
          value={input}
          autoComplete="off"
          name="chatmessage"
          sx={{ width: "100%" }}
          variant="outlined"
          placeholder="Typ hier je tekst"
        />
      </form>
    </Paper>
  );
};

export default ApplicantChat;
