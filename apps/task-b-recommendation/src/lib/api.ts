import { TaskBContextRequest, TaskBChatRequest, TaskBResponse, Recommendation } from "../types";

const API_URL = process.env.NEXT_PUBLIC_TASK_B_API_URL || "https://nexusbert-dsn.hf.space";

const personaDataMap: Record<string, string> = {
  casual_lagos: [
    "display_name: Lagos Foodie",
    "reviews_written: 120",
    "average_stars_across_reviews: 4.1",
    "elite_years: none",
    "city: Lagos",
    "state: Lagos"
  ].join("\n"),
  heavy_naija: [
    "display_name: PH Taste Critic",
    "reviews_written: 88",
    "average_stars_across_reviews: 3.9",
    "elite_years: 2021",
    "city: Port Harcourt",
    "state: Rivers"
  ].join("\n"),
  professional_abuja: [
    "display_name: Abuja Analyst",
    "reviews_written: 54",
    "average_stars_across_reviews: 4.4",
    "elite_years: none",
    "city: Abuja",
    "state: FCT"
  ].join("\n"),
  diaspora: [
    "display_name: Returnee",
    "reviews_written: 102",
    "average_stars_across_reviews: 3.8",
    "elite_years: 2019",
    "city: London",
    "state: UK"
  ].join("\n")
};

export async function fetchInitialRecommendations(data: TaskBContextRequest): Promise<Recommendation[]> {
  try {
    const fullPersona = personaDataMap[data.persona] || `display_name: ${data.persona}`;

    const response = await fetch(`${API_URL}/task-2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_history: [],
        persona: fullPersona,
        top_k_retrieval: 20,
        top_n_final: 3
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error ${response.status}: ${errText}`);
    }
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
    // The history already includes the current user message appended from page.tsx logic
    const formattedHistory = data.history.map((h) => ({
      role: h.role === "assistant" ? "assistant" : "user",
      content: h.content,
    }));
    
    const fullPersona = personaDataMap[data.persona] || `display_name: ${data.persona}`;
    
    const response = await fetch(`${API_URL}/task-2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_history: formattedHistory,
        persona: fullPersona,
        top_k_retrieval: 20,
        top_n_final: 3
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error ${response.status}: ${errText}`);
    }
    const res = await response.json();
    
    return {
      recommendations: res.recommendations.map((r: any) => ({
        name: r.business_id || "Unknown Entity",
        reason: r.rationale || "No rationale provided.",
        score: r.rank === 0 ? 0.99 : Math.max(0.1, 0.99 - (r.rank * 0.1))
      })),
      reply: res.agent_steps?.length
        ? res.agent_steps[res.agent_steps.length - 1]
        : "Here are updated recommendations tailored to your input."
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
