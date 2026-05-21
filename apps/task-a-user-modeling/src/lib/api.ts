export interface TaskAResponse {
  rating: number;
  review: string;
  meta: string[];
}

export interface TaskARequest {
  persona: string;
  category: string;
  item: string;
}

export async function generateUserReview(data: TaskARequest): Promise<TaskAResponse> {
  const API_URL = process.env.NEXT_PUBLIC_TASK_A_API_URL || "https://nexusbert-dsn.hf.space";

  try {
    const response = await fetch(`${API_URL}/task-1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        include_raw: false,
        persona: `display_name: ${data.persona}`,
        product: `name: ${data.item}\ncategories: ${data.category}`
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const res = await response.json();
    return {
      rating: res.stars || 4,
      review: res.review || res.raw || "Model returned an empty response.",
      meta: [`Task: ${res.task || "task-1"}`, `Snippets: ${res.rag_snippets_used || 0}`]
    };
  } catch (error) {
    console.error("Task A API Error:", error);
    // Fallback for development/UI testing if backend is down
    return {
      rating: 4,
      review: "The system is currently unavailable to generate a live review. Please ensure the agent backend is running.",
      meta: ["error", "fallback response"],
    };
  }
}
