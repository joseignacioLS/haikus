const request = async <T>(url: string, headers?: RequestInit): Promise<T> => {
  return fetch(url, headers)
    .then((r) => {
      if (!r.ok || r.status !== 200) throw new Error();
      return r.json();
    })
    .then((d) => d)
    .catch(() => {
      console.error(`Failed request against: ${url}`);
      return null;
    });
};

export const getRequest = async <T>(url: string): Promise<T> => {
  return request<T>(url);
};

export const postRequest = async <T>(
  url: string,
  body?: RequestInit["body"]
): Promise<T> => {
  return request<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
