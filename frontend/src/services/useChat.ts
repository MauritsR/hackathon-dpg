import { useEffect, useRef, useState } from "react";
import { ChatParticipant, Message } from "../types/chat";

const useChat = ({
  remoteUser,
}: {
  localUser: ChatParticipant;
  remoteUser: ChatParticipant;
}) => {
  const ws = useRef<WebSocket>();
  const [messages, setMessages] = useState<Message[]>([
    {
      author: "system",
      content: `Hoi, Je praat nu met ${remoteUser.name}!`,
      avatar: remoteUser.avatar,
    },
  ]);

  const sendMessage = (message: string) => {
    ws.current?.send(message);
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
        setMessages([...messages, JSON.parse(event.data)]);
      }
    };
  }, [messages]);

  return {
    messages,
    sendMessage,
  };
};

export default useChat;
