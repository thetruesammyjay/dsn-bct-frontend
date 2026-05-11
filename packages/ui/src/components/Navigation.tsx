import * as React from "react"

export function Navigation({ badgeText = "DSN x BCT Hackathon 3.0" }: { badgeText?: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-5 py-4 md:px-10 md:py-5 flex items-center justify-between bg-[rgba(8,12,16,0.7)] backdrop-blur-md border-b border-[rgba(255,255,255,0.07)]">
      <div className="font-heading font-extrabold text-lg tracking-tight flex items-center gap-2.5">
        <div className="w-2 h-2 bg-[#1DDF8A] rounded-full animate-pulse opacity-80" />
        NaijaInsight
      </div>
      <span className="font-mono text-[0.65rem] tracking-widest uppercase text-[#1DDF8A] border border-[rgba(29,223,138,0.3)] px-3 py-1.5 rounded bg-[rgba(29,223,138,0.05)]">
        {badgeText}
      </span>
    </nav>
  )
}
