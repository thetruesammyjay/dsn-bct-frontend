import { TaskBContextRequest, TaskBChatRequest, TaskBResponse, Recommendation } from "../types";

const API_URL = process.env.NEXT_PUBLIC_TASK_B_API_URL || "https://nexusbert-dsn.hf.space";

export async function fetchInitialRecommendations(data: TaskBContextRequest): Promise<Recommendation[]> {
  try {
    const response = await fetch(`${API_URL}/task-2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_history: [],
        persona: data.persona,
        city: data.city ?? null,
        state: data.state ?? null,
        top_k_retrieval: 20,
        top_n_final: 3
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error ${response.status}: ${errText}`);
    }
    const res: TaskBResponse = await response.json();
    return res.recommendations;
  } catch (error) {
    console.error("Task B API Error:", error);
    // Fallback for development/UI testing if backend is down
    return [
      { business_id: "fallback_thing_fall_apart", rank: 1, rationale: "A foundational text bridging cultural history. Highly relevant to your context." },
      { business_id: "fallback_chicken_republic_lekki", rank: 2, rationale: "Affordable, widely distributed, and generally well-received. Good baseline recommendation." },
    ];
  }
}

export async function sendChatMessage(data: TaskBChatRequest): Promise<TaskBResponse> {
  try {
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
  } catch (error) {
    console.error("Task B Chat Error:", error);
    return {
      task: "2_recommendation",
      agent_steps: ["fallback_response"],
      candidates_considered: 1,
      recommendations: [
        {
          business_id: "fallback_baba_segis_wives",
          rank: 1,
          rationale: "You requested something more contemporary with strong character dynamics.",
        },
      ],
    };
  }
}
