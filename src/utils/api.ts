
export const getRequest = async <T>(
  url: string
): Promise<T> => {
  return fetch(url)
    .then((r) => {
      if (!r.ok || r.status !== 200) throw new Error();
      return r.json();
    })
    .then((d) => d)
    .catch(() => {
      return null;
    });
};
