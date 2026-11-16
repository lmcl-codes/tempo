
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tempo — Find Your Rhythm",
  description:
    "A simple productivity workspace to manage tasks, stay focused, and build better work habits with Tempo.",
  applicationName: "Tempo",
  keywords: [
    "Tempo",
    "Pomodoro Timer",
    "Productivity",
    "Task Management",
    "Focus Timer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        {children}
      </body>
    </html>
  );
}
