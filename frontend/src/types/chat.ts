export type Message = {
  from: string;
  to: string;
  content: string;
  avatar?: string;
};

export type SetJobId = {
  type: "job";
  id: string;
};

export type ChatParticipant = {
  avatar?: string;
  name: string;
};
