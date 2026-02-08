export type Ticket = {
  id: number;
  title: string;
  status: "Open" | "Closed" | string;
  agent?: string;
  created_at: string;
  closed_at?: string;
};

export type Profile = {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string | null;
};
