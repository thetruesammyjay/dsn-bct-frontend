"use client";

import React, { useState } from "react";
import { Button, Input, Card, CardContent } from "ui";
import { PersonaSelector, TASK_A_PERSONAS } from "./PersonaSelector";
import { ArrowRight, Sparkles } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (persona: string, category: string, item: string) => void;
  isLoading: boolean;
}

export function ReviewForm({ onSubmit, isLoading }: ReviewFormProps) {
  const [persona, setPersona] = useState(TASK_A_PERSONAS[0].value);
  const [category, setCategory] = useState("restaurant");
  const [item, setItem] = useState("The Place, Lekki");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(persona, category, item);
  };

  return (
    <Card className="w-full bg-[#0E1318] border-border shadow-2xl">
      <CardContent className="p-6 md:p-8 flex flex-col gap-6 pt-8">
        
        <PersonaSelector value={persona} onChange={setPersona} />

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            Item Category
          </label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-11 w-full rounded-md border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#E8EDF2] focus-visible:outline-none focus-visible:border-[rgba(29,223,138,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(29,223,138,0.2)]"
          >
            <option value="restaurant">Restaurant / Food</option>
            <option value="book">Book / Literature</option>
            <option value="ecommerce">E-commerce Product</option>
            <option value="movie">Movie / Entertainment</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
            Target Item Name
          </label>
          <Input 
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. Bukka Hut, Things Fall Apart..."
            required 
          />
        </div>

        <Button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isLoading} 
          className="w-full mt-2 h-12 flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            "Generating..."
          ) : (
            <>
              Generate Review
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}