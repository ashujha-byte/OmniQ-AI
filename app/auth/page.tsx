"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Loader2, AlertCircle, Sparkles, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Vector SVG Logo
function OmniQLogo({ className = "h-8 w-auto shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="auth-mesh-grad" x1="10" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Outer Crescent Arc */}
      <path d="M 52 10 A 34 34 0 1 0 54 70" stroke="url(#auth-mesh-grad)" strokeWidth="5" strokeLinecap="round" />

      {/* Network Lines */}
      <g stroke="url(#auth-mesh-grad)" strokeWidth="1.8" strokeLinejoin="round" opacity="0.9">
        <line x1="24" y1="40" x2="46" y2="22" />
        <line x1="24" y1="40" x2="46" y2="58" />
        <line x1="46" y1="22" x2="66" y2="14" />
        <line x1="46" y1="22" x2="62" y2="40" />
        <line x1="46" y1="58" x2="62" y2="40" />
        <line x1="46" y1="58" x2="66" y2="66" />
        <line x1="66" y1="14" x2="78" y2="24" />
        <line x1="78" y1="24" x2="62" y2="40" />
        <line x1="62" y1="40" x2="84" y2="40" />
        <line x1="62" y1="40" x2="78" y2="56" />
        <line x1="78" y1="56" x2="66" y2="66" />
      </g>

      {/* Nodes */}
      <circle cx="24" cy="40" r="6" fill="#3B82F6" />
      <circle cx="46" cy="22" r="5" fill="#4F46E5" />
      <circle cx="46" cy="58" r="5" fill="#6366F1" />
      <circle cx="66" cy="14" r="3.5" fill="#4F46E5" />
      <circle cx="62" cy="40" r="6" fill="#6366F1" />
      <circle cx="66" cy="66" r="3.5" fill="#7C3AED" />
      <circle cx="78" cy="24" r="3.5" fill="#7C3AED" />
      <circle cx="84" cy="40" r="4.5" fill="#8B5CF6" />
      <circle cx="78" cy="56" r="3.5" fill="#8B5CF6" />

      {/* Typography */}
      <text
        x="98"
        y="53"
        fill="#FFFFFF"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="-0.5px"
      >
        OmniQ
      </text>
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Email/Password Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg("Account created! Redirecting to studio workspace...");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Social OAuth Handler (Google / GitHub)
  const handleSocialAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err?.message || `${provider} authentication failed.`);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="relative z-10 mb-8 flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-[430px] rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <OmniQLogo className="h-9 w-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {isSignUp ? "Create your workspace" : "Welcome back to OmniQ"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Universal AI studio for grounded web search, multi-modal lens, and media automation.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            <CheckCircle size={16} className="shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick OAuth Providers */}
        <div className="flex flex-col gap-2.5 mb-5">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-zinc-950/80 hover:bg-zinc-800/90 border border-zinc-800 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 transition active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.3l3.7 2.9C6.2 7.3 8.9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.6 6.3C.6 8.3 0 10.6 0 12s.6 3.7 1.6 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.2L1.6 16C3.5 19.7 7.4 23 12 23z" />
            </svg>
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={() => handleSocialAuth("github")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-zinc-950/80 hover:bg-zinc-800/90 border border-zinc-800 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 transition active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-[1px] bg-zinc-800 flex-1"></div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Or Email</span>
          <div className="h-[1px] bg-zinc-800 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Email</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3.5 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-zinc-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* 3D Action Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_0_#1d4ed8,0_8px_20px_rgba(37,99,235,0.35)] active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Authenticating...
              </>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In to Studio"
            )}
          </button>
        </form>

        {/* Guest Mode Direct Access */}
        <div className="mt-4 pt-4 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full py-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-zinc-800/90 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sparkles size={14} className="text-blue-400" />
            Continue as Guest (Skip for now)
          </button>
        </div>

        {/* Switch mode */}
        <div className="text-center mt-5 text-xs text-zinc-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className="text-blue-400 hover:underline font-bold cursor-pointer ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}