import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "ui";

export const metadata: Metadata = {
  title: "Task A: User Modeling | NaijaInsight",
  description: "DSN x BCT Hackathon 3.0 - Generative Review Modeling with Nigerian Nuance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/30 selection:text-primary" suppressHydrationWarning>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <Navigation badgeText="Task A: User Modeling" />
        {children}
      </body>
    </html>
  );
}