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
  const API_URL = process.env.NEXT_PUBLIC_TASK_A_API_URL || "http://localhost:8000";

  try {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
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
