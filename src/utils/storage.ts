export const storeData = (data: string) => {
  window.localStorage.setItem(import.meta.env.LOCALSTORAGE_KEY, data);
};

export const retrieveData = (): string | null => {
  return window.localStorage.getItem(import.meta.env.LOCALSTORAGE_KEY);
};
