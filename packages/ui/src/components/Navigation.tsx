import * as React from "react"

export interface NavigationProps {
  badgeText?: string;
}

export function Navigation({ badgeText = "DSN x BCT Hackathon 3.0" }: NavigationProps) {
  const isTaskB = badgeText.toLowerCase().includes("task b") || badgeText.toLowerCase().includes("recommendation");

  // Dynamic glow/border matching task theme
  const colorClasses = isTaskB
    ? "text-[#F5A623] border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.05)] shadow-[0_0_15px_rgba(245,166,35,0.08)]"
    : "text-[#1DDF8A] border-[rgba(29,223,138,0.25)] bg-[rgba(29,223,138,0.05)] shadow-[0_0_15px_rgba(29,223,138,0.08)]";

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-5xl flex items-center justify-between bg-[rgba(8,12,16,0.65)] backdrop-blur-xl border border-white/[0.08] px-5 py-3 md:px-7 md:py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <a href="/" className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]">
          <img 
            src="/NaijaInsight.png" 
            alt="NaijaInsight" 
            className="h-8 md:h-9 w-auto object-contain" 
          />
        </a>
        
        <div className="flex items-center gap-3">
          <span className={`font-mono text-[0.65rem] md:text-xs tracking-widest uppercase border px-4 py-2 rounded-full transition-all duration-300 ${colorClasses}`}>
            {badgeText}
          </span>
        </div>
      </nav>
    </header>
  )
}

