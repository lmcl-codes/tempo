
"use client";

import { useEffect } from "react";
import { getTimerSettings } from "@/lib/storage";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const applyTheme = () => {
      const settings = getTimerSettings();

      document.documentElement.setAttribute(
        "data-theme",
        settings.darkMode ? "dark" : "light"
      );
    };

    applyTheme();

    window.addEventListener("tempo-settings-updated", applyTheme);

    return () => {
      window.removeEventListener("tempo-settings-updated", applyTheme);
    };
  }, []);

  return <>{children}</>;
}
