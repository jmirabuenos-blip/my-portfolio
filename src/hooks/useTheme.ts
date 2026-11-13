"use client";
import { useSyncExternalStore } from "react";
export type Theme = "dark" | "light";
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}
function snapshot(): Theme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, snapshot, () => "dark");
}
