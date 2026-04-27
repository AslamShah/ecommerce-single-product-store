"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // For demo/offline mode - accept hardcoded credentials
    if (email === "admin@apexprecision.com" && password === "ApexAdmin2024!") {
      localStorage.setItem("admin_token", "demo-token");
      localStorage.setItem("admin_user", JSON.stringify({ email: "admin@apexprecision.com", role: "admin" }));
      router.push("/admin/dashboard");
      setLoading(false);
      return;
    }

    // Try API call
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem("admin_token", data.access_token);
          localStorage.setItem("admin_user", JSON.stringify(data.user));
          router.push("/admin/dashboard");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch {
      // API not available - use demo mode
      if (email === "admin@apexprecision.com" && password === "ApexAdmin2024!") {
        localStorage.setItem("admin_token", "demo-token");
        localStorage.setItem("admin_user", JSON.stringify({ email: "admin@apexprecision.com", role: "admin" }));
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-display-xl text-[#FF5722] text-3xl lg:text-4xl mb-2">
            APEX PRECISION
          </h1>
          <p className="font-label-caps text-zinc-500 text-xs tracking-widest">
            ADMINISTRATION PORTAL
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 p-4 text-red-500 font-technical-data text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="font-label-caps text-zinc-500 text-xs block mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-4 text-white font-technical-data focus:border-[#FF5722] outline-none transition-all"
              placeholder="admin@apexprecision.com"
              required
            />
          </div>

          <div>
            <label className="font-label-caps text-zinc-500 text-xs block mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-4 text-white font-technical-data focus:border-[#FF5722] outline-none transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF5722] text-black py-4 font-label-caps text-sm tracking-wider hover:bg-[#ff6a3d] transition-all disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "ACCESS PORTAL"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="font-technical-data text-zinc-500 text-sm hover:text-white transition-colors">
            ← RETURN TO STORE
          </Link>
        </div>
      </div>
    </div>
  );
}