let transitioning = false;

/** Cover the location change, then reveal the destination without a long page scroll. */
export async function teleportTo(id: string) {
  const destination = document.getElementById(id);
  if (!destination || transitioning) return;
  transitioning = true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const veil = document.createElement("div");
  veil.className = "teleport-veil";
  veil.setAttribute("aria-hidden", "true");
  const navigate = () => {
    if (!destination.isConnected) return;
    history.replaceState(null, "", `#${id}`);
    destination.scrollIntoView({ behavior: "instant", block: "start" });
    const focus =
      id === "portals"
        ? destination.querySelector<HTMLElement>(".station-canvas")
        : destination;
    if (focus) {
      focus.setAttribute("tabindex", "-1");
      if (id === "portals") focus.setAttribute("tabindex", "0");
      focus.focus({ preventScroll: true });
    }
  };
  try {
    if (reduced) {
      navigate();
      return;
    }
    document.body.appendChild(veil);
    await veil.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 240,
      easing: "ease-in",
      fill: "forwards",
    }).finished;
    navigate();
    await veil.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 460,
      easing: "cubic-bezier(.16,1,.3,1)",
      fill: "forwards",
    }).finished;
  } finally {
    veil.remove();
    transitioning = false;
  }
}
