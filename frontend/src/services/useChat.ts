import { useEffect, useRef, useState } from "react";
import { ChatParticipant, Message } from "../types/chat";

const useChat = ({
  remoteUser,
  localUser,
}: {
  localUser: ChatParticipant;
  remoteUser: ChatParticipant;
}) => {
  const [jobId, setJobId] = useState(null);
  const ws = useRef<WebSocket>();
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "system",
      to: localUser.name,
      content: `Hoi, Je praat nu met ${remoteUser.name}!`,
      avatar: remoteUser.avatar,
    },
  ]);

  const sendMessage = (message: string) => {
    const data: Message = {
      content: message,
      from: localUser.name,
      to: remoteUser.name,
      avatar: localUser?.avatar,
    };
    ws.current?.send(JSON.stringify(data));
  };

  const setJob = (id: string) => {
    ws.current?.send(JSON.stringify({ id }));
  };

  useEffect(() => {
    if (!ws.current) {
      const url = new URL(
        "/ws/" + encodeURI(remoteUser.name),
        "http://localhost:8080"
      );
      url.protocol = url.protocol.replace("http", "ws");

      ws.current = new WebSocket(url.href);

      return () => {
        ws.current?.close();
      };
    }
  }, [remoteUser.avatar, remoteUser.name]);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      if (event.data !== "") {
        const data = JSON.parse(JSON.parse(event.data).content);
        if (data.id) {
          setJobId(data.id);
        } else {
          setMessages([...messages, data]);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    messages,
    sendMessage,
    setJob,
    jobId,
  };
};

export default useChat;
