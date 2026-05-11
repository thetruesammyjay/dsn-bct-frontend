"use client";

import React, { useState } from "react";
import { Button, Card, CardContent } from "ui";

interface ContextInputProps {
  onSubmit: (persona: string, domain: string) => void;
  isLoading: boolean;
}

export function ContextInput({ onSubmit, isLoading }: ContextInputProps) {
  const [persona, setPersona] = useState("foodie_lagos");
  const [domain, setDomain] = useState("food");

  return (
    <Card className="w-full bg-[#0E1318] border-border shadow-2xl">
      <CardContent className="p-6 md:p-8 flex flex-col gap-6 pt-8">
        
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            User Persona Configuration
          </label>
          <select 
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="flex h-11 w-full rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#E8EDF2] focus-visible:outline-none focus-visible:border-[rgba(245,166,35,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(245,166,35,0.2)]"
          >
            <option value="foodie_lagos">Lagos Foodie (High Intent)</option>
            <option value="book_nerd">Book Nerd (Analytical)</option>
            <option value="new_user">New User (Cold Start)</option>
            <option value="cross_domain">Cross-Domain (Music to Books)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            Target Domain
          </label>
          <select 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex h-11 w-full rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#E8EDF2] focus-visible:outline-none focus-visible:border-[rgba(245,166,35,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(245,166,35,0.2)]"
          >
            <option value="food">Restaurants & Food</option>
            <option value="books">Books & Literature</option>
            <option value="movies">Movies & Entertainment</option>
          </select>
        </div>

        <Button 
          type="button" 
          onClick={() => onSubmit(persona, domain)} 
          disabled={isLoading} 
          className="w-full mt-2 h-12 flex items-center justify-center gap-2 bg-accent text-[#080C10] hover:bg-[#ffb03a] shadow-[0_8px_24px_rgba(245,166,35,0.2)]"
        >
          {isLoading ? "Thinking..." : "Get Initial Recommendations"}
        </Button>
      </CardContent>
    </Card>
  );
}
