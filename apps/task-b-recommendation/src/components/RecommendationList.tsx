import React from "react";
import { Recommendation } from "../types";
import { MapPin, Tag, Star, Sparkles } from "lucide-react";

function RankBadge({ rank }: { rank: number }) {
  return (
    <div
      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm border transition-all ${
        rank === 1
          ? "bg-accent/15 border-accent/40 text-accent shadow-[0_0_12px_rgba(245,166,35,0.15)]"
          : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-muted-foreground"
      }`}
    >
      #{rank}
    </div>
  );
}

function StarRow({ stars }: { stars: number }) {
  const full = Math.round(Math.min(5, Math.max(0, stars)));
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < full
              ? "fill-accent text-accent"
              : "fill-transparent text-[rgba(245,166,35,0.2)]"
          }`}
        />
      ))}
      <span className="ml-1.5 font-mono text-[0.6rem] text-muted-foreground">
        {stars.toFixed(1)}
      </span>
    </div>
  );
}

export function RecommendationList({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      {recommendations.map((rec, idx) => {
        const location = [rec.city, rec.state].filter(Boolean).join(", ");
        const categoryList = rec.categories
          ?.split(",")
          .map((c) => c.trim())
          .filter(Boolean)
          .slice(0, 4) ?? [];

        return (
          <div
            key={`${rec.business_id}-${rec.rank}-${idx}`}
            className={`group flex gap-4 p-5 rounded-xl border transition-all duration-200 ${
              rec.rank === 1
                ? "border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.03)] hover:border-accent/40"
                : "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(245,166,35,0.12)] hover:bg-[rgba(255,255,255,0.03)]"
            }`}
          >
            {/* Rank badge */}
            <div className="pt-0.5">
              <RankBadge rank={rec.rank} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">

              {/* Name + stars */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {rec.name ? (
                    <h4 className="font-bold text-base leading-snug tracking-tight text-foreground truncate">
                      {rec.name}
                    </h4>
                  ) : (
                    <p className="font-mono text-[0.65rem] text-muted-foreground/40 truncate">
                      {rec.business_id}
                    </p>
                  )}
                </div>
                {rec.stars != null && <StarRow stars={rec.stars} />}
              </div>

              {/* Categories */}
              {categoryList.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                  {categoryList.map((cat) => (
                    <span
                      key={cat}
                      className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-0.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-muted-foreground/70"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Location */}
              {location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                  <span className="font-mono text-[0.63rem] text-muted-foreground/60">
                    {location}
                  </span>
                </div>
              )}

              {/* Rationale — always present */}
              <div className="border-t border-[rgba(255,255,255,0.05)] pt-2 mt-0.5 flex gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent/50 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.rationale}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
