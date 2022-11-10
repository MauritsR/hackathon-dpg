import { useCallback, useEffect, useState } from "react";
import { Job } from "../types/job";
import { ChatParticipant, Message } from "../types/chat";

const useChat = ({
  localUser,
  remoteUser,
}: {
  localUser: ChatParticipant;
  remoteUser: ChatParticipant;
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      author: "system",
      content: `Hoi ${localUser.name}, Je praat nu met ${remoteUser.name}!`,
    },
  ]);

  const handleNewMessage = useCallback(
    (message: Message) => {
      setMessages([...messages, message]);
    },
    [messages]
  );

  useEffect(() => {
    let ws: WebSocket;
    const url = new URL(
      "/ws/" + encodeURI(remoteUser.name),
      "http://localhost:8080"
    );
    url.protocol = url.protocol.replace("http", "ws");

    ws = new WebSocket(url.href);
    ws.onmessage = (event) => {
      if (event.data !== "") {
        handleNewMessage({
          ...JSON.parse(event.data),
          avatar: remoteUser.avatar,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return messages;
};

export default useChat;
