"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getDictionary } from "../../../lib/i18n";

export default function RegisterPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const registerResponse = await fetch(`${baseUrl}/accounts/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: email || undefined,
          password,
          display_name: displayName || undefined,
        }),
      });

      if (!registerResponse.ok) {
        throw new Error("Registration failed");
      }

      const loginResponse = await fetch(`${baseUrl}/accounts/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }

      const data = (await loginResponse.json()) as { access: string; refresh: string };
      window.localStorage.setItem("tp_access_token", data.access);
      window.localStorage.setItem("tp_refresh_token", data.refresh);
      router.push(`/${params.locale}/profile`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F3F4F6]">
      <section className="mx-auto max-w-lg px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-semibold text-stone-900">Create account</h1>
          <p className="mt-2 text-sm text-stone-500">Join the archive and start contributing.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-widest text-stone-400">Username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-stone-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-stone-400">Display name</label>
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-stone-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => router.push(`/${params.locale}/login`)}
            className="mt-6 text-sm font-semibold text-stone-600 hover:text-stone-900"
          >
            I already have an account
          </button>
        </div>
      </section>
    </div>
  );
}
