const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const INTERNAL_API_BASE_URL = process.env.INTERNAL_API_BASE_URL || API_BASE_URL;

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = typeof window === "undefined" ? INTERNAL_API_BASE_URL : API_BASE_URL;
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("tp_access_token");
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
