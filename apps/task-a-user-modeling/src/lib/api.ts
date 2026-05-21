export interface TaskAResponse {
  task: string;
  agent_steps: string[];
  rag_snippets_used: number;
  stars: number | null;
  review: string;
  parse_ok: boolean;
  raw?: string | null;
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
    const categoryContext = {
      restaurant: "Restaurants, Nigerian, Fast Food",
      book: "Books, Literature, Nigerian Fiction",
      ecommerce: "Shopping, E-commerce, Grocery Delivery",
      movie: "Movies, Entertainment, Nollywood",
    }[data.category] || data.category;

    const productContext = [
      `name: ${data.item}`,
      `categories: ${categoryContext}`,
      "location: Nigeria",
      "business_avg_stars: 4.0",
      "business_review_count: 100",
      "is_open: 1",
    ].join("\n");

    const response = await fetch(`${API_URL}/task-1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        include_raw: false,
        persona: data.persona,
        product: productContext,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error ${response.status}: ${errText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Task A API Error:", error);
    return {
      task: "1_user_modeling",
      agent_steps: ["fallback_response"],
      rag_snippets_used: 0,
      stars: 4,
      review: "The system is currently unavailable to generate a live review. Please ensure the agent backend is running.",
      parse_ok: false,
      raw: null,
      meta: ["error", "fallback response"],
    };
  }
}
