export interface TaskAResponse {
  task: string;
  agent_steps: string[];
  rag_snippets_used: number;
  stars: number | null;
  review: string;
  parse_ok: boolean;
  raw?: string | null;
  meta?: string[];
  // Set to true by the frontend when the API call failed — not from the backend
  _isError?: boolean;
  _errorMessage?: string;
}

export interface TaskARequest {
  persona: string;
  category: string;
  item: string;
}

// Per-category defaults sent to the backend to help the LLM calibrate its output
const CATEGORY_CONTEXT: Record<string, { label: string; avg_stars: string; review_count: string }> = {
  restaurant: { label: "Restaurants, Nigerian, Fast Food", avg_stars: "3.8", review_count: "214" },
  book:        { label: "Books, Literature, Nigerian Fiction", avg_stars: "4.2", review_count: "89" },
  ecommerce:   { label: "Shopping, E-commerce, Grocery Delivery", avg_stars: "3.5", review_count: "432" },
  movie:       { label: "Movies, Entertainment, Nollywood", avg_stars: "4.0", review_count: "156" },
};

export async function generateUserReview(data: TaskARequest): Promise<TaskAResponse> {
  // Both Task A and Task B live on the SAME FastAPI backend service
  const API_URL =
    process.env.NEXT_PUBLIC_TASK_A_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://nexusbert-dsn.hf.space"; // deployed HuggingFace Space

  const ctx = CATEGORY_CONTEXT[data.category] ?? {
    label: data.category,
    avg_stars: "4.0",
    review_count: "100",
  };

  const productContext = [
    `name: ${data.item}`,
    `categories: ${ctx.label}`,
    "location: Nigeria",
    `business_avg_stars: ${ctx.avg_stars}`,
    `business_review_count: ${ctx.review_count}`,
    "is_open: 1",
  ].join("\n");

  try {
    const response = await fetch(`${API_URL}/task-1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const message =
      error instanceof Error ? error.message : "Unknown error contacting the agent API.";
    console.error("Task A API Error:", message);

    // Return a clearly-flagged error object so the UI can show the right state
    return {
      task: "1_user_modeling",
      agent_steps: [],
      rag_snippets_used: 0,
      stars: null,
      review: "",
      parse_ok: false,
      raw: null,
      _isError: true,
      _errorMessage: message,
    };
  }
}
