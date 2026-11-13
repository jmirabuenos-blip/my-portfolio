export const STATIONS = [
  {
    id: "work",
    name: "Work",
    x: -7,
    z: -2,
    detail: "View my web development projects.",
  },
  {
    id: "about",
    name: "About",
    x: 7,
    z: -2,
    detail: "Background and technical skills.",
  },
  {
    id: "education",
    name: "Education",
    x: -6,
    z: 6,
    detail: "Schools and qualifications.",
  },
] as const;

export const DECK_RADIUS = 11.5;
export const START = { x: 0, z: 5 };
export type StationSnapshot = {
  x: number;
  z: number;
  height: number;
  nearby: number;
  walking: boolean;
};

export function nearestStation(x: number, z: number): number {
  return STATIONS.findIndex((s) => Math.hypot(s.x - x, s.z - z) < 2.5);
}

export function moveOnDeck(
  x: number,
  z: number,
  dx: number,
  dz: number,
  dt: number,
) {
  const length = Math.hypot(dx, dz);
  if (length > 0) {
    const step = (4.2 * Math.min(Math.max(dt, 0), 0.05)) / Math.max(1, length);
    x += dx * step;
    z += dz * step;
  }
  const radius = Math.hypot(x, z);
  if (radius > DECK_RADIUS) {
    x *= DECK_RADIUS / radius;
    z *= DECK_RADIUS / radius;
  }
  return { x, z };
}
