export type Ticket = {
  id: string;
  name: string;
  description: string;
  status: "open" | "closed" | "in-progress";
  createdAt: Date;
  updatedAt: Date;
};
