const rawApiUrl = (import.meta.env.VITE_API_URL || "").trim();

const fallbackApiUrl = import.meta.env.PROD
  ? "https://netbin.onrender.com"
  : "http://localhost:8080";

export const API_BASE_URL = (rawApiUrl || fallbackApiUrl).replace(/\/+$/, "");
export const API_URL_FROM_ENV = Boolean(rawApiUrl);

export function apiUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

if (!API_URL_FROM_ENV && import.meta.env.DEV) {
  console.warn(
    `[env] VITE_API_URL no está definido. Usando fallback: ${API_BASE_URL}`,
  );
}

