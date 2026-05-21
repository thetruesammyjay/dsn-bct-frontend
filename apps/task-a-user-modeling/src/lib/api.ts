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

const personaDataMap: Record<string, string> = {
  casual_lagos: [
    "user_id: lagos_01",
    "display_name: Lagosian",
    "yelping_since: 2019-04-12",
    "reviews_written: 86",
    "average_stars_across_reviews: 4.1",
    "useful_votes_given: 24",
    "funny_votes_given: 6",
    "cool_votes_given: 11",
    "fans: 3",
    "elite_years: none",
    "friend_count: 42",
    "traits: Casual, practical, slightly witty, mentions traffic and value for money."
  ].join("\n"),
  heavy_naija: [
    "user_id: ph_02",
    "display_name: Port Harcourt Boy",
    "yelping_since: 2018-11-03",
    "reviews_written: 131",
    "average_stars_across_reviews: 3.8",
    "useful_votes_given: 31",
    "funny_votes_given: 14",
    "cool_votes_given: 18",
    "fans: 8",
    "elite_years: 2020, 2021",
    "friend_count: 57",
    "traits: Highly expressive, speaks in Nigerian Pidgin, strong opinions, energetic cadence."
  ].join("\n"),
  professional_abuja: [
    "user_id: abuja_03",
    "display_name: Abuja Professional",
    "yelping_since: 2020-02-20",
    "reviews_written: 54",
    "average_stars_across_reviews: 4.4",
    "useful_votes_given: 16",
    "funny_votes_given: 2",
    "cool_votes_given: 9",
    "fans: 5",
    "elite_years: none",
    "friend_count: 26",
    "traits: Formal, concise, evaluates service quality and consistency carefully."
  ].join("\n"),
  diaspora: [
    "user_id: ijbg_04",
    "display_name: Returnee",
    "yelping_since: 2017-09-15",
    "reviews_written: 102",
    "average_stars_across_reviews: 3.9",
    "useful_votes_given: 29",
    "funny_votes_given: 5",
    "cool_votes_given: 15",
    "fans: 6",
    "elite_years: 2019",
    "friend_count: 38",
    "traits: Comparative tone, benchmarks against UK/US service and standards."
  ].join("\n")
};

const productMap: Record<string, string> = {
  restaurant: [
    "name: The Place, Lekki",
    "categories: Restaurants, Nigerian, Fast Food",
    "location: Lekki, Lagos",
    "business_avg_stars: 4.1",
    "business_review_count: 256",
    "is_open: 1"
  ].join("\n"),
  book: [
    "name: Things Fall Apart",
    "categories: Books, Literature, Nigerian Fiction",
    "location: Lagos, Nigeria",
    "business_avg_stars: 4.7",
    "business_review_count: 1854",
    "is_open: 1"
  ].join("\n"),
  ecommerce: [
    "name: Jumia Express Groceries",
    "categories: Shopping, E-commerce, Grocery Delivery",
    "location: Nigeria",
    "business_avg_stars: 3.8",
    "business_review_count: 920",
    "is_open: 1"
  ].join("\n"),
  movie: [
    "name: A Tribe Called Judah",
    "categories: Movies, Entertainment, Nollywood",
    "location: Nigeria",
    "business_avg_stars: 4.2",
    "business_review_count: 624",
    "is_open: 1"
  ].join("\n")
};

export async function generateUserReview(data: TaskARequest): Promise<TaskAResponse> {
  const API_URL = process.env.NEXT_PUBLIC_TASK_A_API_URL || "https://nexusbert-dsn.hf.space";

  try {
    const fullPersona = personaDataMap[data.persona] || `display_name: ${data.persona}`;
    const productContext = productMap[data.category] || [
      `name: ${data.item}`,
      `categories: ${data.category}`,
      "location: Nigeria",
      "business_avg_stars: 4.0",
      "business_review_count: 100",
      "is_open: 1"
    ].join("\n");
    
    const response = await fetch(`${API_URL}/task-1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        include_raw: false,
        persona: fullPersona,
        product: productContext
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error ${response.status}: ${errText}`);
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
