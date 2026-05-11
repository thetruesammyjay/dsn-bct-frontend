import { TaskBContextRequest, TaskBChatRequest, TaskBResponse, Recommendation } from "../types";

const API_URL = process.env.NEXT_PUBLIC_TASK_B_API_URL || "http://localhost:8001";

export async function fetchInitialRecommendations(data: TaskBContextRequest): Promise<Recommendation[]> {
  try {
    const response = await fetch(`${API_URL}/api/recommendations/initial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const res: TaskBResponse = await response.json();
    return res.recommendations;
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
    const response = await fetch(`${API_URL}/api/recommendations/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
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
