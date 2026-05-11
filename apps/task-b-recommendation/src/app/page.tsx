"use client";

import React, { useState } from "react";
import { ContextInput } from "../components/ContextInput";
import { RecommendationList } from "../components/RecommendationList";
import { ChatInterface } from "../components/ChatInterface";
import { fetchInitialRecommendations, sendChatMessage } from "../lib/api";
import { Recommendation, ChatMessage } from "../types";
import { Card, CardContent } from "ui";

export default function TaskBPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState({ persona: "", domain: "" });

  const handleInitialContext = async (persona: string, domain: string) => {
    setIsLoading(true);
    setContext({ persona, domain });
    setHistory([]);
    try {
      const recs = await fetchInitialRecommendations({ persona, domain });
      setRecommendations(recs);
      setHistory([{ role: "assistant", content: `I've found some initial recommendations based on the ${persona} profile in the ${domain} domain.` }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async (message: string) => {
    const newContextHistory = [...history, { role: "user", content: message } as ChatMessage];
    setHistory(newContextHistory);
    setIsLoading(true);

    try {
      const res = await sendChatMessage({
        persona: context.persona,
        domain: context.domain,
        history: newContextHistory,
        message
      });
      if (res.reply) {
        setHistory([...newContextHistory, { role: "assistant", content: res.reply }]);
      }
      if (res.recommendations?.length) {
        setRecommendations(res.recommendations);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-10 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent mb-4 border border-[rgba(245,166,35,0.25)] px-3.5 py-1.5 rounded-sm bg-[rgba(245,166,35,0.05)]">
            Task B Agent
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Contextual Recommender
          </h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Go beyond collaborative filtering. Provide a persona and engage with the agent to refine ranked recommendations in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ContextInput onSubmit={handleInitialContext} isLoading={isLoading && history.length === 0} />
            
            {recommendations.length > 0 && (
              <Card className="w-full bg-[rgba(0,0,0,0.3)] border-border animate-fade-up">
                <CardContent className="p-6">
                  <ChatInterface 
                    history={history} 
                    onSendMessage={handleChat} 
                    isLoading={isLoading && history.length > 0} 
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommendations Side */}
          <div className="lg:col-span-7 relative min-h-[400px]">
            {isLoading && recommendations.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/50 border border-border rounded-xl">
                <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin mb-4" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest animate-pulse">
                  Querying Index...
                </span>
              </div>
            ) : recommendations.length > 0 ? (
              <RecommendationList recommendations={recommendations} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-surface/30 border border-border/50 border-dashed rounded-xl p-8 text-center text-muted-foreground">
                Set a persona to fetch initial recommendations.
              </div>
            )}
          </div>
        </div>
        
      </div>
    </main>
  );
}
