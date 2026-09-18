'use client';

import { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Download, 
  LayoutTemplate, 
  Loader2,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

const TEMPLATES = [
  { id: 'tech-logo', title: 'Tech Startup Minimal Logo', category: 'Logo', prompt: 'Modern geometric minimalist logo for a tech AI company, vector style, isolated on pure black' },
  { id: 'coffee-brand', title: 'Aesthetic Coffee Shop Brand', category: 'Branding', prompt: 'Vintage artisan coffee house logo, clean circular badge emblem, warm golden and brown colors' },
  { id: 'music-poster', title: 'Summer Festival Music Poster', category: 'Poster', prompt: 'Psychedelic bold typography music festival poster, sunset vibrant gradients, ultra detailed' },
  { id: 'yt-banner', title: 'YouTube 16:9 Banner Header', category: 'Banner', prompt: 'High-energy futuristic YouTube gaming banner, cyberpunk neon glow, 3D text placement' },
];

export function GeneratePanel() {
  const [brandName, setBrandName] = useState('');
  const [prompt, setPrompt] = useState(TEMPLATES[0].prompt);
  const [generating, setGenerating] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  const handleApplyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setPrompt(tpl.prompt);
    toast.success(`Loaded template: ${tpl.title}`);
  };

  const handleGenerate = () => {
    const finalPrompt = brandName.trim() ? `Brand Name: "${brandName}". ${prompt}` : prompt;
    if (!finalPrompt.trim()) return;

    setGenerating(true);
    setTimeout(() => {
      setOutputImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
      setGenerating(false);
      toast.success('Graphics generated successfully!');
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Ready-made Templates Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <LayoutTemplate size={13} className="text-indigo-400" /> Ready-to-Use Brand Templates
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleApplyTemplate(tpl)}
              className="p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800 text-left transition cursor-pointer group"
            >
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{tpl.category}</span>
              <p className="text-xs font-semibold text-zinc-200 mt-1 line-clamp-1 group-hover:text-white">{tpl.title}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Brand / Company Name (Optional)</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. OmniQ or Nova AI"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Custom Prompt & Graphic Details</label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe logo emblem, colors, typography, or poster layout..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              type="button"
              disabled={generating || (!prompt.trim() && !brandName.trim())}
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md active:translate-y-0.5 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Rendering Vector Poster...
                </>
              ) : (
                <>
                  <Wand2 size={16} /> Generate Graphic / Logo
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Canvas */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-center items-center min-h-[300px]">
          {generating && (
            <div className="flex flex-col items-center gap-3 text-zinc-400 text-xs">
              <Sparkles size={28} className="animate-pulse text-indigo-400" />
              <span>Synthesizing vectors and typography...</span>
            </div>
          )}

          {!generating && !outputImage && (
            <div className="flex flex-col items-center text-center text-zinc-500 text-xs gap-2">
              <ImageIcon size={32} className="opacity-30" />
              <p>Pick a template or enter your brand name to generate instant posters or logos.</p>
            </div>
          )}

          {!generating && outputImage && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl max-h-64 w-full">
                <img src={outputImage} alt="Generated Artwork" className="object-cover w-full max-h-64" />
              </div>
              <a
                href={outputImage}
                target="_blank"
                download="omniq-design.jpg"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition shadow-md"
              >
                <Download size={14} /> Download 4K Asset
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}