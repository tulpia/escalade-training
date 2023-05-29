import levels from "@/src/levels";

export function useLevel(level) {
  if (levels[level]) {
    return levels[level];
  }

  return "Niveau non-défini.";
}
