import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "ui";

export const metadata: Metadata = {
  title: "Task B: Recommendation | NaijaInsight",
  description: "DSN x BCT Hackathon 3.0 - Contextual and Conversational Recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-heading: 'Syne', sans-serif;
            --font-sans: 'DM Sans', sans-serif;
            --font-mono: 'DM Mono', monospace;
          }
        `}</style>
      </head>
      <body className="antialiased selection:bg-accent/30 selection:text-accent">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <Navigation badgeText="Task B: Recommendation" />
        {children}
      </body>
    </html>
  );
}
