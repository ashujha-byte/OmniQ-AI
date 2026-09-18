'use client';

import { useRouter } from 'next/navigation';
import { Search, Eye, Sparkles, Video, ArrowRight } from 'lucide-react';

// Exact Pure Vector SVG Logo Component (Fixed proportions & no overflow)
function OmniQLogo({ className = "h-8 sm:h-9 w-auto shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="omniq-mesh-grad" x1="10" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Outer Left Circular Crescent Arc */}
      <path
        d="M 52 10 A 34 34 0 1 0 54 70"
        stroke="url(#omniq-mesh-grad)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Network Constellation Lines */}
      <g stroke="url(#omniq-mesh-grad)" strokeWidth="1.8" strokeLinejoin="round" opacity="0.9">
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

      {/* Network Nodes */}
      <circle cx="24" cy="40" r="6" fill="#3B82F6" />
      <circle cx="46" cy="22" r="5" fill="#4F46E5" />
      <circle cx="46" cy="58" r="5" fill="#6366F1" />
      <circle cx="66" cy="14" r="3.5" fill="#4F46E5" />
      <circle cx="62" cy="40" r="6" fill="#6366F1" />
      <circle cx="66" cy="66" r="3.5" fill="#7C3AED" />
      <circle cx="78" cy="24" r="3.5" fill="#7C3AED" />
      <circle cx="84" cy="40" r="4.5" fill="#8B5CF6" />
      <circle cx="78" cy="56" r="3.5" fill="#8B5CF6" />

      {/* Brand Text: OmniQ */}
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

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute top-1/2 -right-24 h-[480px] w-[480px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Bar */}
      <header className="relative z-30 w-full border-b border-zinc-800/70 bg-[#070709]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div 
            onClick={() => handleNavigate('/')} 
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            {/* Pure Code SVG Logo */}
            <OmniQLogo className="h-8 sm:h-9 w-auto" />

            {/* Attached Badge (No line, minimal space) */}
            <div className="hidden sm:flex flex-col justify-center">
              <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-[9px] font-extrabold text-blue-400 border border-blue-500/30 uppercase tracking-widest w-fit">
                AI PRO
              </span>
              <p className="text-[10px] tracking-wider text-zinc-500 uppercase font-medium mt-0.5">
                Search · Create · Automate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavigate('/auth')}
              className="rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/auth')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_0_#1d4ed8,0_8px_20px_rgba(37,99,235,0.35)] border-t border-blue-400/40 active:translate-y-0.5 transition-all cursor-pointer"
            >
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-30 w-full max-w-5xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-8">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/30 text-blue-300 text-xs font-semibold shadow-[0_2px_12px_rgba(59,130,246,0.2)]">
          <Sparkles size={14} className="text-blue-400 animate-pulse" />
          <span>Powered by OmniQ AI & Real-Time Grounding</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight max-w-3xl leading-[1.1] text-white drop-shadow-md">
          Search Everything. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
            Create Anything.
          </span>
        </h1>

        <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
          OmniQ is an integrated platform that brings together live internet search, photo lens analysis, poster generation, and automated video-to-shorts generation into a single workspace.
        </p>

        {/* 3D Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
          <button
            type="button"
            onClick={() => handleNavigate('/auth')}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-bold text-sm sm:text-base shadow-[0_5px_0_#1d4ed8,0_12px_28px_rgba(37,99,235,0.45)] border-t border-blue-400/50 active:translate-y-1 transition-all cursor-pointer group"
          >
            <span>Launch OmniQ Free</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border-t border-white/10 border-b-2 border-b-zinc-950 text-zinc-200 font-bold text-sm sm:text-base shadow-[0_4px_0_#18181b] active:translate-y-1 transition-all cursor-pointer"
          >
            <span>Direct Dashboard Demo</span>
          </button>
        </div>

        {/* Feature Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-10 text-left">
          {/* Card 1: Smart Search */}
          <div
            onClick={() => handleNavigate('/auth')}
            className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:bg-zinc-900/90 hover:shadow-[0_12px_30px_rgba(59,130,246,0.25)] cursor-pointer select-none"
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 text-blue-400 shadow-[0_4px_12px_rgba(59,130,246,0.25)] group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Search size={22} />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-zinc-100 text-sm xl:text-base group-hover:text-white transition-colors truncate">
                  Smart Search
                </h3>
                <span className="shrink-0 whitespace-nowrap rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                  Live Web
                </span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                Query the open web in real time. Delivers hyper-accurate, verifiable answers backed by live internet citations.
              </p>
            </div>
          </div>

          {/* Card 2: Vision Lens */}
          <div
            onClick={() => handleNavigate('/auth')}
            className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/50 hover:bg-zinc-900/90 hover:shadow-[0_12px_30px_rgba(20,184,166,0.25)] cursor-pointer select-none"
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/30 text-teal-400 shadow-[0_4px_12px_rgba(20,184,166,0.25)] group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <Eye size={22} />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-zinc-100 text-sm xl:text-base group-hover:text-white transition-colors truncate">
                  Vision Lens
                </h3>
                <span className="shrink-0 whitespace-nowrap rounded-md bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-400 border border-teal-500/20">
                  Multimodal
                </span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                Snap or upload any visual asset. Instantly inspect schematics, debug screen code, and analyze complex diagrams.
              </p>
            </div>
          </div>

          {/* Card 3: Posters & Logos */}
          <div
            onClick={() => handleNavigate('/auth')}
            className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:bg-zinc-900/90 hover:shadow-[0_12px_30px_rgba(99,102,241,0.25)] cursor-pointer select-none"
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 text-indigo-400 shadow-[0_4px_12px_rgba(99,102,241,0.25)] group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Sparkles size={22} />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-zinc-100 text-sm xl:text-base group-hover:text-white transition-colors truncate">
                  Posters & Logos
                </h3>
                <span className="shrink-0 whitespace-nowrap rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                  Creative Studio
                </span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                Generate clean vector emblems, marketing banners, and bespoke graphics directly from short descriptive prompts.
              </p>
            </div>
          </div>

          {/* Card 4: Video to Shorts */}
          <div
            onClick={() => handleNavigate('/auth')}
            className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-500/50 hover:bg-zinc-900/90 hover:shadow-[0_12px_30px_rgba(217,70,239,0.25)] cursor-pointer select-none"
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_4px_12px_rgba(217,70,239,0.25)] group-hover:scale-110 group-hover:bg-fuchsia-600 group-hover:text-white transition-all duration-300">
                <Video size={22} />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-zinc-100 text-sm xl:text-base group-hover:text-white transition-colors truncate">
                  Video to Shorts
                </h3>
                <span className="shrink-0 whitespace-nowrap rounded-md bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-400 border border-fuchsia-500/20">
                  Viral Clips
                </span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                Repurpose long-form streams and podcasts into viral, vertical 9:16 clips complete with kinetic subtitles.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 w-full border-t border-zinc-800/60 bg-[#070709]/60 backdrop-blur-xl py-6 text-center text-zinc-500 text-xs">
        <p>© 2026 OmniQ Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}