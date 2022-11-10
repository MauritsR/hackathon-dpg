import Paper from "@mui/material/Paper";
import MatchCard from "../components/MatchCard";
import useChat from "../services/useChat";
import ChatMessages from "../components/ChatMessages";
import TextField from "@mui/material/TextField";
import useGetJobs from "../services/useGetJobs";

const CompanyChat = () => {
  const jobs = useGetJobs();
  const job = jobs.length > 0 ? jobs[0] : undefined;
  const messages = useChat({
    localUser: {
      name: job?.company || "",
      avatar: job?.logo || "",
    },
    remoteUser: {
      name: "applicant",
    },
  });
  console.log(jobs);

  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      {job && <MatchCard job={job} />}
      <ChatMessages messages={messages} />
      <TextField
        sx={{ width: "100%" }}
        variant="outlined"
        placeholder="Typ hier je tekst"
      />
    </Paper>
  );
};

export default CompanyChat;
