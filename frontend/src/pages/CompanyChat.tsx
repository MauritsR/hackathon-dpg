import Paper from "@mui/material/Paper";
import MatchCard from "../components/MatchCard";
import useChat from "../services/useChat";
import ChatMessages from "../components/ChatMessages";
import TextField from "@mui/material/TextField";
import useGetJobs from "../services/useGetJobs";
import { useEffect, useState } from "react";

const CompanyChat = () => {
  const jobs = useGetJobs();
  const [jobId, setJobId] = useState(null);
  const job =
    jobs.length > 0 ? jobs.find((job) => job.id === jobId) : undefined;
  const [input, setInput] = useState("");
  const {
    messages,
    sendMessage,
    jobId: chatJobId,
  } = useChat({
    localUser: {
      name: job?.company || "",
      avatar: job?.logo || "",
    },
    remoteUser: {
      name: "applicant",
    },
  });

  useEffect(() => {
    if (chatJobId !== null) {
      setJobId(chatJobId);
    }
  }, [chatJobId]);

  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      {job && (
        <>
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
        </>
      )}{" "}
    </Paper>
  );
};

export default CompanyChat;
