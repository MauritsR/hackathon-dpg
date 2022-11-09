import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import type { Message } from "../types/message";

type ChatMessagesProps = {
  messages: Message[];
};

const ChatMessages: React.FunctionComponent<ChatMessagesProps> = ({
  messages,
}) => {
  return (
    <List sx={{ m: 1, width: "100%", bgcolor: "background.paper" }}>
      {messages.map((message) => (
        <ListItem key={message.content}>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: "50px",
                height: "auto",
                p: 0.5,
                border: "1px solid lightgrey",
              }}
              variant="square"
              src={message.avatar}
            />
          </ListItemAvatar>
          <ListItemText primary={message.content} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatMessages;
