import React from "react";
import { TaskAResponse } from "../lib/api";
import { Star } from "lucide-react";
import { Card, CardContent } from "ui";

interface OutputBoxProps {
  response: TaskAResponse;
}

export function OutputBox({ response }: OutputBoxProps) {
  const rating = response.stars ?? 0;
  const stars = Array.from({ length: 5 }).map((_, index) => {
    return index < Math.floor(rating);
  });

  return (
    <Card className="w-full bg-[rgba(0,0,0,0.3)] border-border animate-fade-up h-full">
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
          <div className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">
            Agent Output
          </div>
          
          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-md border border-[rgba(245,166,35,0.2)]">
            <div className="flex gap-1">
              {stars.map((isFilled, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${isFilled ? "fill-accent text-accent" : "fill-none text-muted"}`} 
                />
              ))}
            </div>
            <span className="font-mono text-sm font-bold ml-1">{rating}/5</span>
          </div>
        </div>

        <div className="flex-1 text-[0.95rem] leading-relaxed text-foreground mb-8 text-pretty whitespace-pre-wrap">
          {response.review}
        </div>

        <div className="mt-auto">
          <div className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
            Identified Markers
            <div className="h-px bg-border/50 flex-1" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              `Task: ${response.task}`,
              `RAG snippets: ${response.rag_snippets_used}`,
              `Parse ok: ${response.parse_ok ? "yes" : "no"}`,
              ...response.agent_steps,
            ].map((tag, i) => (
              <span 
                key={i} 
                className="font-mono text-[0.65rem] px-2.5 py-1 rounded bg-[rgba(255,255,255,0.03)] border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}