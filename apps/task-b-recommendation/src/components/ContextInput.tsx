"use client";

import React, { useState } from "react";
import { Button, Card, CardContent } from "ui";

export const TASK_B_PERSONAS = [
  {
    label: "Lagos Foodie (High Intent)",
    value: [
      "display_name: Lagos Foodie",
      "reviews_written: 120",
      "average_stars_across_reviews: 4.1",
      "elite_years: none",
      "city: Lagos",
      "state: Lagos",
    ].join("\n"),
  },
  {
    label: "Book Nerd (Analytical)",
    value: [
      "display_name: Book Nerd",
      "reviews_written: 64",
      "average_stars_across_reviews: 4.6",
      "elite_years: 2022",
      "city: Ibadan",
      "state: Oyo",
    ].join("\n"),
  },
  {
    label: "New User (Cold Start)",
    value: [
      "display_name: New User",
      "reviews_written: 0",
      "average_stars_across_reviews: 0.0",
      "elite_years: none",
      "city: Abuja",
      "state: FCT",
    ].join("\n"),
  },
  {
    label: "Cross-Domain (Music to Books)",
    value: [
      "display_name: Cross Domain Explorer",
      "reviews_written: 29",
      "average_stars_across_reviews: 4.0",
      "elite_years: 2021",
      "city: Port Harcourt",
      "state: Rivers",
    ].join("\n"),
  },
];

interface ContextInputProps {
  onSubmit: (persona: string, city: string, state: string) => void;
  isLoading: boolean;
}

export function ContextInput({ onSubmit, isLoading }: ContextInputProps) {
  const [persona, setPersona] = useState(TASK_B_PERSONAS[0].value);
  const [city, setCity] = useState("Lagos");
  const [state, setState] = useState("Lagos");

  return (
    <Card className="w-full bg-[#0E1318] border-border shadow-2xl">
      <CardContent className="p-6 md:p-8 flex flex-col gap-6 pt-8">
        
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            User Persona Snapshot
          </label>
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="flex h-11 w-full rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#E8EDF2] focus-visible:outline-none focus-visible:border-[rgba(245,166,35,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(245,166,35,0.2)]"
          >
            {TASK_B_PERSONAS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Lagos"
            className="flex h-11 w-full rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#E8EDF2] focus-visible:outline-none focus-visible:border-[rgba(245,166,35,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(245,166,35,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            State
          </label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g. Lagos"
            className="flex h-11 w-full rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#E8EDF2] focus-visible:outline-none focus-visible:border-[rgba(245,166,35,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(245,166,35,0.2)]"
          />
        </div>

        <Button 
          type="button" 
          onClick={() => onSubmit(persona, city, state)} 
          disabled={isLoading} 
          className="w-full mt-2 h-12 flex items-center justify-center gap-2 bg-accent text-[#080C10] hover:bg-[#ffb03a] shadow-[0_8px_24px_rgba(245,166,35,0.2)]"
        >
          {isLoading ? "Thinking..." : "Get Initial Recommendations"}
        </Button>
      </CardContent>
    </Card>
  );
}
