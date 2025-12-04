const BASE_URL = location.origin;

const getUrl = (path: string) => {
  return new URL(path, BASE_URL).toString();
};

export const SpxFetch = {
  get: async (path: string, options?: RequestInit) => {
    const res = await fetch(getUrl(path), { method: "GET", ...options });
    return res.json();
  },
  put: async (path: string, options?: RequestInit) => {
    const res = await fetch(getUrl(path), { method: "PUT", ...options });
    return res.json();
  },
  post: async (path: string, options?: RequestInit) => {
    const res = await fetch(getUrl(path), { method: "POST", ...options });
    return res.json();
  },
  delete: async (path: string, options?: RequestInit) => {
    const res = await fetch(getUrl(path), { method: "DELETE", ...options });
    return res.json();
  },
  patch: async (path: string, options?: RequestInit) => {
    const res = await fetch(getUrl(path), { method: "PATCH", ...options });
    return res.json();
  },
};
