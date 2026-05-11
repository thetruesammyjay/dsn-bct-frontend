"use client";

import React from "react";
import { Check } from "lucide-react";

interface PersonaSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export function PersonaSelector({ value, onChange }: PersonaSelectorProps) {

  const personas = [
    { id: "casual_lagos", label: "Casual (Lagos)", tag: "Balanced" },
    { id: "heavy_naija", label: "Heavy Pidgin (PH)", tag: "Expressive" },
    { id: "professional_abuja", label: "Professional (Abuja)", tag: "Formal" },
    { id: "diaspora", label: "Diaspora (UK/US)", tag: "Comparative" }
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted">
          User Persona
        </label>
        <span className="font-mono text-[0.65rem] text-primary">Nigerian Context ON</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {personas.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            className={`
              relative flex flex-col items-start p-3 rounded-lg border text-left transition-all
              ${value === p.id 
                ? "bg-[rgba(29,223,138,0.05)] border-[rgba(29,223,138,0.4)]" 
                : "bg-transparent border-border hover:border-border/80 hover:bg-[rgba(255,255,255,0.02)]"
              }
            `}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className={`text-sm font-medium ${value === p.id ? "text-primary" : "text-foreground"}`}>
                {p.label}
              </span>
              {value === p.id && <Check className="w-3.5 h-3.5 text-primary" />}
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