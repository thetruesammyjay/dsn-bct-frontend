import React from "react";
import { Recommendation } from "../types";

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      {recommendations.map((rec, idx) => (
        <div 
          key={`${rec.business_id}-${rec.rank}-${idx}`} 
          className="flex gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(245,166,35,0.2)] hover:bg-[rgba(255,255,255,0.04)]"
        >
          <div className="font-mono text-xl font-bold text-accent opacity-80 pt-1">
            0{rec.rank}
          </div>
          
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-1 tracking-tight text-foreground">{rec.business_id}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {rec.rationale}
            </p>
            
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] text-accent tracking-widest">
                RANK: {rec.rank}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
