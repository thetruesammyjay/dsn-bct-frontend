import React from "react";
import { Recommendation } from "../types";

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      {recommendations.map((rec, idx) => {
        // Show the human-readable name if the backend provides it.
        // Falls back to the business_id (UUID) until the backend adds name to the response.
        const displayName = rec.name || rec.business_id;
        const hasName = Boolean(rec.name);

        return (
          <div
            key={`${rec.business_id}-${rec.rank}-${idx}`}
            className="flex gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(245,166,35,0.2)] hover:bg-[rgba(255,255,255,0.04)]"
          >
            <div className="font-mono text-xl font-bold text-accent opacity-80 pt-1">
              0{rec.rank}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-lg mb-0.5 tracking-tight text-foreground truncate">
                {displayName}
              </h4>

              {/* Show categories as a subtitle if the backend provides them */}
              {rec.categories && (
                <p className="text-[0.65rem] font-mono text-muted-foreground/60 uppercase tracking-wider mb-2">
                  {rec.categories}
                </p>
              )}

              {/* Warn that UUIDs are showing — helps during demo if backend hasn't added name yet */}
              {!hasName && (
                <p className="text-[0.65rem] font-mono text-amber-600/50 mb-2">
                  ID only · name pending backend update
                </p>
              )}

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
        );
      })}
    </div>
  );
}
