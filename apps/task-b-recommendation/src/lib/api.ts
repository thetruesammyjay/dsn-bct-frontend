import { TaskBContextRequest, TaskBChatRequest, TaskBResponse, Recommendation } from "../types";

// Both Task A and Task B run on the SAME FastAPI backend service
const API_URL =
  process.env.NEXT_PUBLIC_TASK_B_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://nexusbert-dsn.hf.space";

export async function fetchInitialRecommendations(
  data: TaskBContextRequest
): Promise<Recommendation[]> {
  const response = await fetch(`${API_URL}/task-2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_history: [],
      persona: data.persona,
      city: data.city ?? null,
      state: data.state ?? null,
      top_k_retrieval: 20,
      top_n_final: 3,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${errText}`);
  }

  const res: TaskBResponse = await response.json();
  return res.recommendations;
}

export async function sendChatMessage(data: TaskBChatRequest): Promise<TaskBResponse> {
  const response = await fetch(`${API_URL}/task-2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      persona: data.persona,
      city: data.city ?? null,
      state: data.state ?? null,
      chat_history: data.chat_history.map((h) => ({
        role: h.role,
        content: h.content,
      })),
      top_k_retrieval: data.top_k_retrieval ?? 20,
      top_n_final: data.top_n_final ?? 3,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${errText}`);
  }

  return await response.json();
}
