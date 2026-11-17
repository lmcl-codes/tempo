
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Script from "next/script";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const savedSettings = localStorage.getItem("tempo-timer-settings");
                const settings = savedSettings ? JSON.parse(savedSettings) : {};

                document.documentElement.setAttribute(
                  "data-theme",
                  settings.darkMode ? "dark" : "light"
                );
              } catch {
                document.documentElement.setAttribute("data-theme", "light");
              }
            })();
          `}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
