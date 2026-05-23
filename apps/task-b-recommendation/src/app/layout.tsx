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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-accent/30 selection:text-accent" suppressHydrationWarning>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <Navigation badgeText="Task B: Recommendation" />
        {children}
      </body>
    </html>
  );
}
