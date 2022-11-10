import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import type { Message } from "../types/chat";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

type ChatMessagesProps = {
  messages: Message[];
};

const ChatMessages: React.FunctionComponent<ChatMessagesProps> = ({
  messages,
}) => {
  return (
    <Card sx={{ marginBottom: 2, marginTop: 2, boxShadow: 4 }}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default ChatMessages;
