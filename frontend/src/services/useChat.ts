import { useCallback, useEffect, useState } from "react";
import { Job } from "../types/job";
import { Message } from "../types/message";

const useChat = ({ user, job }: { user: string; job: Job }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      author: "system",
      content: `Je praat nu met ${job.company}!`,
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
    const url = new URL("/ws/" + encodeURI(user), "http://localhost:8080");
    url.protocol = url.protocol.replace("http", "ws");

    ws = new WebSocket(url.href);
    ws.onmessage = (event) => {
      if (event.data !== "") {
        handleNewMessage({
          ...JSON.parse(event.data),
          avatar: job.logo,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return messages;
};

export default useChat;
