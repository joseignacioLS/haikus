export const cleanHaiku = (haiku: string): string => {
  return haiku.replace(/\-/g, "").replace(/_/g, " ");
};

export const formatDate = (date: string): string[] => {
  return date.slice(2).split("-");
};
