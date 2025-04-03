export const cleanHaiku = (haiku: string): string => {
  return haiku.replace(/\-/g, "").replace(/_/g, " ");
};
