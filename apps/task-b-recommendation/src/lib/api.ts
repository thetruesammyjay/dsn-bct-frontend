import { TaskBContextRequest, TaskBChatRequest, TaskBResponse, Recommendation } from "../types";

const API_URL = process.env.NEXT_PUBLIC_TASK_B_API_URL || "https://nexusbert-dsn.hf.space";

export async function fetchInitialRecommendations(data: TaskBContextRequest): Promise<Recommendation[]> {
  try {
    const response = await fetch(`${API_URL}/task-2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_history: [],
        persona: `display_name: ${data.persona}`,
        top_k_retrieval: 20,
        top_n_final: 3
      }),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const res = await response.json();
    return res.recommendations.map((r: any) => ({
      name: r.business_id || "Unknown Entity",
      reason: r.rationale || "No rationale provided by model.",
      score: r.rank === 0 ? 0.99 : (0.99 - (r.rank * 0.1))
    }));
  } catch (error) {
    console.error("Task B API Error:", error);
    // Fallback for development/UI testing if backend is down
    return [
      { name: "Things Fall Apart – Chinua Achebe", reason: "A foundational text bridging cultural history. Highly relevant to your context.", score: 0.92 },
      { name: "Chicken Republic, Lekki", reason: "Affordable, widely distributed, and generally well-received. Good baseline recommendation.", score: 0.79 },
    ];
  }
}

export async function sendChatMessage(data: TaskBChatRequest): Promise<TaskBResponse> {
  try {
    const formattedHistory = data.history.map(h => [h.role === "user" ? "user" : "agent", h.content]);
    if (data.message) {
      formattedHistory.push(["user", data.message]);
    }
    
    const response = await fetch(`${API_URL}/task-2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_history: formattedHistory,
        persona: `display_name: ${data.persona}`,
        top_k_retrieval: 20,
        top_n_final: 3
      }),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const res = await response.json();
    
    return {
      recommendations: res.recommendations.map((r: any) => ({
        name: r.business_id || "Unknown Entity",
        reason: r.rationale || "No rationale provided.",
        score: r.rank === 0 ? 0.99 : Math.max(0.1, 0.99 - (r.rank * 0.1))
      })),
      reply: "Here are updated recommendations tailored to your input."
    };
  } catch (error) {
    console.error("Task B Chat Error:", error);
    return {
      reply: "I understand your preference. Here are updated recommendations reflecting that context.",
      recommendations: [
        { name: "The Secret Lives of Baba Segi's Wives", reason: "You requested something more contemporary with strong character dynamics.", score: 0.88 }
      ]
    };
  }
}
