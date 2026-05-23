"use client";

import React, { useState } from "react";
import { ReviewForm } from "../components/ReviewForm";
import { OutputBox } from "../components/OutputBox";
import { generateUserReview, TaskAResponse } from "../lib/api";

export default function TaskAPage() {
  const [response, setResponse] = useState<TaskAResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (persona: string, category: string, item: string) => {
    setIsLoading(true);
    setResponse(null);
    try {
      const res = await generateUserReview({ persona, category, item });
      setResponse(res);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-10 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-[#1DDF8A] mb-4 before:content-[''] before:block before:w-5 before:h-px before:bg-[#1DDF8A]">
            Task A Agent
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Simulate a Review
          </h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Input a persona and a target item. The agent will adopt behavioral traits, 
            tone, and Nigerian contextual elements to generate a realistic user review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Form Side */}
          <div className="w-full">
            <ReviewForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Output Side */}
          <div className="w-full relative min-h-[300px]">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/50 border border-border rounded-xl">
                <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-4" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest animate-pulse">
                  Reasoning...
                </span>
              </div>
            ) : response ? (
              <OutputBox response={response} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-surface/30 border border-border/50 border-dashed rounded-xl p-8 text-center text-muted-foreground">
                Hit generate to see the modeled user response.
              </div>
            )}
          </div>
        </div>
        
      </div>
    </main>
  );
}