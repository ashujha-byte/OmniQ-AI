'use client';

import { useState } from 'react';
import { 
  Video, 
  Scissors, 
  Play, 
  Download, 
  Loader2, 
  Wand2, 
  Clock, 
  Sparkles,
  Tv
} from 'lucide-react';
import { toast } from 'sonner';

export function VideoPanel() {
  const [videoInputType, setVideoInputType] = useState<'link' | 'upload' | 'prompt'>('link');
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState<'short' | 'long'>('short');
  const [generating, setGenerating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleGenerateVideo = () => {
    if (videoInputType === 'link' && !url.trim()) {
      toast.error('Kripya YouTube ya video link daalein');
      return;
    }
    if (videoInputType === 'prompt' && !prompt.trim()) {
      toast.error('Kripya video ad / scene ka prompt likhein');
      return;
    }

    setGenerating(true);
    setCompleted(false);

    setTimeout(() => {
      setGenerating(false);
      setCompleted(true);
      toast.success(duration === 'long' ? '10-Minute Full Video rendered!' : 'Viral Short created!');
    }, 2800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Switcher */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setVideoInputType('link')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            videoInputType === 'link'
              ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
              : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Video size={14} /> YouTube Link Auto-Clipper
        </button>

        <button
          type="button"
          onClick={() => setVideoInputType('prompt')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            videoInputType === 'prompt'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Wand2 size={14} /> Prompt-to-Video & Ads Engine
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings Box */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Tv size={14} className="text-fuchsia-400" /> Video Mode Configuration
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDuration('short')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  duration === 'short' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40' : 'text-zinc-500'
                }`}
              >
                9:16 Short
              </button>
              <button
                type="button"
                onClick={() => setDuration('long')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  duration === 'long' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'text-zinc-500'
                }`}
              >
                Up to 10-Min Video
              </button>
            </div>
          </div>

          {videoInputType === 'link' ? (
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">YouTube or Video URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          ) : (
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Prompt for Full Video / Commercial Ad</label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Create a 10-minute cinematic documentary about Quantum Supercomputers in 2026 with voiceover and dramatic transitions..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          )}

          <button
            type="button"
            disabled={generating}
            onClick={handleGenerateVideo}
            className="w-full py-3 rounded-xl bg-gradient-to-b from-fuchsia-500 to-fuchsia-700 text-white text-xs sm:text-sm font-bold shadow-md active:translate-y-0.5 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Rendering Video Stream...
              </>
            ) : (
              <>
                <Scissors size={16} /> {duration === 'long' ? 'Generate 10-Min Video' : 'Create Viral 9:16 Short'}
              </>
            )}
          </button>
        </div>

        {/* Video Canvas Output */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-center items-center min-h-[300px]">
          {generating && (
            <div className="flex flex-col items-center gap-3 text-zinc-400 text-xs">
              <Loader2 size={28} className="animate-spin text-fuchsia-400" />
              <span>Transcribing hook points, cutting scenes and adding subtitles...</span>
            </div>
          )}

          {!generating && !completed && (
            <div className="flex flex-col items-center text-center text-zinc-500 text-xs gap-2">
              <Play size={32} className="opacity-30" />
              <p>Paste a YouTube URL or enter a prompt to visualize and produce full video assets.</p>
            </div>
          )}

          {!generating && completed && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className={`relative rounded-2xl overflow-hidden border-2 border-zinc-700 bg-black shadow-2xl flex items-center justify-center ${duration === 'short' ? 'w-44 h-72' : 'w-full h-56'}`}>
                <Play size={32} className="text-white drop-shadow cursor-pointer hover:scale-110 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="bg-yellow-400 text-black px-2 py-0.5 text-[9px] font-black uppercase rounded shadow">
                    {duration === 'long' ? '10-MIN CINEMATIC' : 'VIRAL HOOK'}
                  </span>
                  <p className="text-white text-[11px] font-bold mt-1 leading-tight">
                    "OmniQ AI Next-Gen Visualizer"
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-b from-fuchsia-500 to-fuchsia-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                <Download size={14} /> Download Ready Video (.mp4)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}