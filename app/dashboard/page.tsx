'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Eye,
  Wand2,
  Video,
  Sparkles,
  Menu,
  X,
  Home,
  LogOut,
  ChevronRight,
  SlidersHorizontal,
  Clock,
  History,
  Settings,
  MoreVertical,
  ShieldCheck,
  User,
  Mail,
  Key
} from 'lucide-react';
import { SearchPanel } from '@/components/panels/search-panel';
import { VisionPanel } from '@/components/panels/vision-panel';
import { GeneratePanel } from '@/components/panels/generate-panel';
import { VideoPanel } from '@/components/panels/video-panel';
import { supabase } from '@/lib/supabase';
import type { ToolMode, ToolConfig } from '@/lib/types';

function OmniQIcon({ className = "h-10 w-10 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="dash-icon-grad" x1="10" y1="10" x2="110" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path d="M 68 14 A 42 42 0 1 0 72 86" stroke="url(#dash-icon-grad)" strokeWidth="5.5" strokeLinecap="round" />
      <g stroke="url(#dash-icon-grad)" strokeWidth="2" strokeLinejoin="round" opacity="0.9">
        <line x1="32" y1="50" x2="62" y2="28" />
        <line x1="32" y1="50" x2="62" y2="72" />
        <line x1="62" y1="28" x2="88" y2="16" />
        <line x1="62" y1="28" x2="82" y2="50" />
        <line x1="62" y1="72" x2="82" y2="50" />
        <line x1="62" y1="72" x2="88" y2="84" />
        <line x1="88" y1="16" x2="104" y2="30" />
        <line x1="104" y1="30" x2="82" y2="50" />
        <line x1="82" y1="50" x2="110" y2="50" />
        <line x1="82" y1="50" x2="104" y2="70" />
        <line x1="104" y1="70" x2="88" y2="84" />
      </g>
      <circle cx="32" cy="50" r="7" fill="#3B82F6" />
      <circle cx="62" cy="28" r="5.5" fill="#4F46E5" />
      <circle cx="62" cy="72" r="5.5" fill="#6366F1" />
      <circle cx="88" cy="16" r="4.5" fill="#4F46E5" />
      <circle cx="82" cy="50" r="7" fill="#6366F1" />
      <circle cx="88" cy="84" r="4.5" fill="#7C3AED" />
      <circle cx="104" cy="30" r="4.5" fill="#7C3AED" />
      <circle cx="110" cy="50" r="5" fill="#8B5CF6" />
      <circle cx="104" cy="70" r="4.5" fill="#8B5CF6" />
    </svg>
  );
}

const TOOLS: ToolConfig[] = [
  {
    id: 'search',
    label: 'Smart Search',
    shortLabel: 'Search',
    description: 'Coding, Math, Research & Multi-lingual Chat',
    icon: Search,
  },
  {
    id: 'vision',
    label: 'Vision Lens',
    shortLabel: 'Vision',
    description: 'Image-to-Image & Prompt Visual Synthesis',
    icon: Eye,
  },
  {
    id: 'generate',
    label: 'Logo & Poster Generator',
    shortLabel: 'Design',
    description: 'Brand Templates, Banners & Graphic Engine',
    icon: Wand2,
  },
  {
    id: 'video',
    label: 'Video to Shorts',
    shortLabel: 'Shorts & Ads',
    description: 'YouTube link, 10-Min Video & Automated Ad Creator',
    icon: Video,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<ToolMode>('search');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    avatar: string;
    avatarUrl?: string | null;
    id?: string;
  }>({
    name: 'Aetherix User',
    email: 'aetherixofficialsupport@gmail.com',
    avatar: 'A',
    avatarUrl: null,
    id: 'usr_omniq_live',
  });

  const [historyItems, setHistoryItems] = useState([
    { id: 1, title: 'Build Next.js auth with Supabase', type: 'search' },
    { id: 2, title: 'Calculus derivative limits proof', type: 'search' },
    { id: 3, title: 'Cyberpunk 3D Vector Emblem', type: 'generate' },
  ]);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const email = session.user.email || 'user@omniq.ai';
          const meta = session.user.user_metadata || {};
          const fullName = meta.full_name || meta.name || email.split('@')[0];
          const avatarImage = meta.avatar_url || meta.picture || null;

          setUserProfile({
            name: fullName.charAt(0).toUpperCase() + fullName.slice(1),
            email: email,
            avatar: fullName.charAt(0).toUpperCase(),
            avatarUrl: avatarImage,
            id: session.user.id,
          });
        }
      } catch (err) {
        console.warn('Session fetch bypass:', err);
      }
    }
    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const email = session.user.email || 'user@omniq.ai';
        const meta = session.user.user_metadata || {};
        const fullName = meta.full_name || meta.name || email.split('@')[0];
        const avatarImage = meta.avatar_url || meta.picture || null;

        setUserProfile({
          name: fullName.charAt(0).toUpperCase() + fullName.slice(1),
          email: email,
          avatar: fullName.charAt(0).toUpperCase(),
          avatarUrl: avatarImage,
          id: session.user.id,
        });
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      router.push('/auth');
    }
  };

  const handleNewSearch = (queryTitle: string) => {
    if (!queryTitle) return;
    setHistoryItems((prev) => [
      { id: Date.now(), title: queryTitle, type: 'search' },
      ...prev.slice(0, 8),
    ]);
  };

  const activeTool = TOOLS.find((t) => t.id === activeMode) || TOOLS[0];

  function renderPanel() {
    switch (activeMode) {
      case 'search':
        return <SearchPanel onNewSearch={handleNewSearch} />;
      case 'vision':
        return <VisionPanel />;
      case 'generate':
        return <GeneratePanel />;
      case 'video':
        return <VideoPanel />;
      default:
        return <SearchPanel onNewSearch={handleNewSearch} />;
    }
  }

  return (
    <div className="relative flex min-h-screen bg-[#070709] text-zinc-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-20 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Account Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-[#0d0e12] p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Settings size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Account Settings</h3>
                  <p className="text-xs text-zinc-400">OmniQ AI Authentication & Subscriptions</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSettingsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                {userProfile.avatarUrl ? (
                  <img src={userProfile.avatarUrl} alt={userProfile.name} className="h-12 w-12 rounded-2xl object-cover border border-blue-500/40" />
                ) : (
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                    {userProfile.avatar}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">{userProfile.name}</h4>
                  <p className="text-xs text-zinc-400">{userProfile.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck size={11} /> Google Verified Auth
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                  <span className="text-zinc-500 flex items-center gap-1.5"><Key size={13} /> Supabase User ID</span>
                  <span className="font-mono text-[11px] text-zinc-300 truncate max-w-[200px]">{userProfile.id}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                  <span className="text-zinc-500 flex items-center gap-1.5"><Sparkles size={13} /> Active Tier</span>
                  <span className="font-bold text-blue-400">OmniQ AI Unlimited Pro (2026)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSettingsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-zinc-800/80 bg-[#0b0c10]/95 backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.8)]' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <OmniQIcon className="h-10 w-10 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-black tracking-tight text-white drop-shadow">OmniQ</h1>
                <span className="rounded-md bg-blue-500/15 px-1.5 py-0.5 text-[9px] font-extrabold text-blue-400 border border-blue-500/30 uppercase tracking-widest">
                  AI PRO
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-zinc-500 uppercase font-medium mt-0.5">
                Search · Create · Automate
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/80 lg:hidden transition shadow-[0_2px_0_#27272a]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <SlidersHorizontal size={13} className="text-blue-400" /> AI Engines
            </span>
          </div>

          <div className="space-y-2">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeMode === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    setActiveMode(tool.id);
                    setSidebarOpen(false);
                  }}
                  className={`group relative flex w-full items-start gap-3.5 rounded-2xl p-3 text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 border-t border-zinc-600/50 border-x border-zinc-700/40 border-b-2 border-b-zinc-950 shadow-[0_6px_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] text-white translate-y-0.5'
                      : 'bg-zinc-900/40 hover:bg-zinc-800/50 border-t border-white/5 border-b border-zinc-950 shadow-[0_3px_0_#18181b] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_3px_0_#1d4ed8,0_4px_10px_rgba(37,99,235,0.4)]'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 shadow-inner'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1 pr-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold tracking-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {tool.label}
                      </p>
                      <ChevronRight
                        size={13}
                        className={`transition-transform duration-200 ${
                          isActive ? 'text-blue-400 translate-x-0.5' : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-zinc-500">
                      {tool.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* User History */}
          <div className="space-y-2 pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <History size={12} className="text-teal-400" /> Recent Activity
              </span>
            </div>

            <div className="space-y-1">
              {historyItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveMode('search');
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-xl text-xs text-zinc-400 bg-zinc-950/30 hover:bg-zinc-800/50 hover:text-zinc-200 border border-zinc-900 hover:border-zinc-700/60 shadow-[0_2px_0_#121215] active:translate-y-0.5 transition-all truncate group cursor-pointer"
                >
                  <Clock size={13} className="text-zinc-600 group-hover:text-blue-400 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card & Settings Popup */}
        <div className="border-t border-zinc-800/80 p-4 space-y-3 relative">
          {profileMenuOpen && (
            <div className="absolute bottom-24 left-4 right-4 bg-zinc-900/95 border border-zinc-700/80 rounded-2xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.8)] space-y-1 z-50 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  setSettingsModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-200 hover:bg-zinc-800 transition text-left cursor-pointer"
              >
                <Settings size={14} className="text-blue-400" /> Account Settings
              </button>
              <Link
                href="/"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800 transition"
              >
                <Home size={14} /> Home Page
              </Link>
              <div className="h-[1px] bg-zinc-800 my-1" />
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition cursor-pointer text-left"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="w-full flex items-center gap-3 p-2 rounded-2xl bg-gradient-to-b from-zinc-800/70 to-zinc-900/90 border-t border-zinc-600/40 border-x border-zinc-800 border-b-2 border-b-zinc-950 shadow-[0_4px_10px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-inner transition-all cursor-pointer text-left"
          >
            {userProfile.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="h-9 w-9 rounded-xl object-cover border border-blue-400/30"
              />
            ) : (
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-[0_2px_8px_rgba(37,99,235,0.4)] border border-blue-400/30">
                {userProfile.avatar}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-200 truncate">{userProfile.name}</p>
              <p className="text-[10px] text-zinc-500 truncate">{userProfile.email}</p>
            </div>
            <MoreVertical size={16} className="text-zinc-500" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col lg:ml-72 min-w-0">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-800/70 bg-[#070709]/75 px-6 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white shadow-[0_2px_0_#18181b] active:translate-y-0.5 lg:hidden transition"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow">
                  {activeTool.label}
                </h2>
                <span className="hidden sm:inline-block rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/20 shadow-inner">
                  {activeTool.shortLabel}
                </span>
              </div>
              <p className="hidden text-xs text-zinc-400 sm:block mt-0.5">
                {activeTool.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1.5 text-xs text-emerald-400 shadow-[0_2px_8px_rgba(16,185,129,0.15)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              </span>
              <span className="hidden sm:inline font-semibold">All Systems Operational</span>
              <span className="sm:hidden font-semibold">Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-8 max-w-6xl w-full mx-auto">
          <div className="transition-all duration-300 ease-in-out">
            {renderPanel()}
          </div>
        </main>
      </div>
    </div>
  );
}