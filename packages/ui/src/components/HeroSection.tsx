import * as React from "react"
import { Button } from "./ui/button"

export interface HeroSectionProps {
  dateTag?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export function HeroSection({
  dateTag = "LLM Agent Challenge — May 4 – Jun 10, 2026",
  title = (
    <>
      User Modeling<br />That <em className="not-italic text-primary relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:opacity-30 after:rounded-sm">Thinks</em><br />Nigerian
    </>
  ),
  subtitle = "Two autonomous agents. One understands how users review products. The other recommends what they will want next. Both speak the language.",
  primaryActionText = "Try Demo",
  primaryActionHref = "#demo",
  secondaryActionText = "View Source",
  secondaryActionHref = "https://github.com/thetruesammyjay/dsn-bct-frontend"
}: HeroSectionProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-10 pt-[140px] pb-20 text-center">
      <div className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-widest uppercase text-accent border border-[rgba(245,166,35,0.25)] px-3.5 py-1.5 rounded-sm bg-[rgba(245,166,35,0.05)] mb-9 animate-fade-up before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">
        {dateTag}
      </div>
      
      <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-[7rem] leading-none tracking-tight max-w-[900px] mb-7 animate-fade-up [animation-delay:100ms]">
        {title}
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-[540px] leading-relaxed mb-12 animate-fade-up [animation-delay:200ms]">
        {subtitle}
      </p>
      
      <div className="flex gap-3.5 flex-wrap justify-center animate-fade-up [animation-delay:300ms]">
        <Button asChild size="lg" className="h-[46px] px-7">
          <a href={primaryActionHref}>{primaryActionText}</a>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-[46px] px-7">
          <a href={secondaryActionHref} target="_blank" rel="noopener noreferrer">
            {secondaryActionText}
          </a>
        </Button>
      </div>
    </div>
  )
}
