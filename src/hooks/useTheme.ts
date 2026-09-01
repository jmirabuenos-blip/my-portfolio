"use client";
import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light";

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");

  const sync = useCallback(() => {
    setTheme(
      document.documentElement.classList.contains("light") ? "light" : "dark"
    );
  }, []);

  useEffect(() => {
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [sync]);

  return theme;
}
