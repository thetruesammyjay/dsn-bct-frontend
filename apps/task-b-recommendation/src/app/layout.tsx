import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "ui";

const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "600", "700", "800"] 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["300", "400", "500"] 
});

const dmMono = DM_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  weight: ["400", "500"] 
});

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
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
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
