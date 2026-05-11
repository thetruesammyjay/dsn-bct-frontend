export interface Recommendation {
  name: string;
  reason: string;
  score: number;
}

export interface TaskBContextRequest {
  persona: string;
  domain: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface TaskBChatRequest {
  persona: string;
  domain: string;
  history: ChatMessage[];
  message: string;
}

export interface TaskBResponse {
  recommendations: Recommendation[];
  reply?: string;
}
