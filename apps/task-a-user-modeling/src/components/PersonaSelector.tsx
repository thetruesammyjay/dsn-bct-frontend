"use client";

import React from "react";
import { Check } from "lucide-react";

export const TASK_A_PERSONAS = [
  {
    label: "Casual (Lagos)",
    tag: "Balanced",
    value: [
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
  },
  {
    label: "Heavy Pidgin (PH)",
    tag: "Expressive",
    value: [
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
  },
  {
    label: "Professional (Abuja)",
    tag: "Formal",
    value: [
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
  },
  {
    label: "Diaspora (UK/US)",
    tag: "Comparative",
    value: [
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
    ].join("\n"),
  },
];

interface PersonaSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export function PersonaSelector({ value, onChange }: PersonaSelectorProps) {

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
          User Persona
        </label>
        <span className="font-mono text-[0.65rem] text-primary">Nigerian Context ON</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {TASK_A_PERSONAS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => onChange(p.value)}
            className={`
              relative flex flex-col items-start p-3 rounded-lg border text-left transition-all
              ${value === p.value 
                ? "bg-[rgba(29,223,138,0.05)] border-[rgba(29,223,138,0.4)]" 
                : "bg-transparent border-border hover:border-border/80 hover:bg-[rgba(255,255,255,0.02)]"
              }
            `}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className={`text-sm font-medium ${value === p.value ? "text-primary" : "text-foreground"}`}>
                {p.label}
              </span>
              {value === p.value && <Check className="w-3.5 h-3.5 text-primary" />}
            </div>
            <span className="text-[0.65rem] text-muted-foreground font-mono uppercase tracking-wider">
              {p.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}