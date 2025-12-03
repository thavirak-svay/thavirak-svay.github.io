export type NodeType = "client" | "lb" | "server" | "db" | "cache";

export interface NodeProps {
  id: string;
  type: NodeType;
  title: string;
  status?: string;
  isActive?: boolean;
  isDead?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface Packet {
  id: number;
  type: "request" | "db-response" | "cache-response" | "error";
  x: number;
  y: number;
}

export interface ServerState {
  id: string;
  active: boolean;
  name: string;
}
