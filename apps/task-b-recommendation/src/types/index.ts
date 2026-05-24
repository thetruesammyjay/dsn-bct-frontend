export interface Recommendation {
  business_id: string;
  rank: number;
  rationale: string;
  // Optional enrichment fields — present when the backend includes them
  name?: string;
  categories?: string;
  city?: string;
  state?: string;
  stars?: number | null;
}


export interface TaskBContextRequest {
  persona: string;
  city?: string | null;
  state?: string | null;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface TaskBChatRequest {
  persona: string;
  city?: string | null;
  state?: string | null;
  chat_history: ChatMessage[];
  top_k_retrieval?: number;
  top_n_final?: number;
}

export interface TaskBResponse {
  task: string;
  agent_steps: string[];
  candidates_considered: number;
  recommendations: Recommendation[];
}

export interface ApiError {
  _isError: true;
  message: string;
}
