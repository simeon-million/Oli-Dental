"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/staff/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo / Brand */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-accent"
          >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-bold text-primary">
          Staff Portal
        </h1>
        <p className="text-foreground/50 text-sm mt-1">Oli Dental Clinic</p>
      </div>

      {/* Login Card */}
      <div className="bg-secondary rounded-3xl shadow-2xl border border-primary/8 w-full max-w-md overflow-hidden">
        <div className="p-8 md:p-10">
          <h2 className="font-serif text-2xl text-primary mb-6">
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                <Mail className="w-4 h-4 text-accent" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@olidental.com"
                required
                className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                <Lock className="w-4 h-4 text-accent" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-primary text-secondary py-4 rounded-xl font-bold text-base hover:bg-primary/85 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-background/60 border-t border-primary/8 px-8 py-4">
          <p className="text-center text-foreground/40 text-xs">
            Access restricted to authorized Oli Dental staff only.
          </p>
        </div>
      </div>

      {/* Back to website */}
      <a
        href="/"
        className="mt-6 text-sm text-foreground/40 hover:text-primary transition-colors flex items-center gap-1"
      >
        ← Back to website
      </a>
    </div>
  );
}
