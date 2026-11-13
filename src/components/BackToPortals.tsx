"use client";
import { teleportTo } from "@/lib/teleport";
import { ArrowUpLeft } from "lucide-react";
export default function BackToPortals() {
  return (
    <a
      className="back-to-portals"
      href="#portals"
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        void teleportTo("portals");
      }}
    >
      <ArrowUpLeft size={18} /> Back to portals
    </a>
  );
}
