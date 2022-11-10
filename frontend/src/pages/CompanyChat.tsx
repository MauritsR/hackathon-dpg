import Paper from "@mui/material/Paper";
import MatchCard from "../components/MatchCard";
import useChat from "../services/useChat";
import ChatMessages from "../components/ChatMessages";
import TextField from "@mui/material/TextField";
import useGetJobs from "../services/useGetJobs";
import { useState } from "react";

const CompanyChat = () => {
  const jobs = useGetJobs();
  const job = jobs.length > 0 ? jobs[0] : undefined;
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({
    localUser: {
      name: job?.company || "",
      avatar: job?.logo || "",
    },
    remoteUser: {
      name: "applicant",
    },
  });

  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      {job && <MatchCard job={job} />}
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

export default CompanyChat;
