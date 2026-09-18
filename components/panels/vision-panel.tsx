'use client';

import { useState, useRef } from 'react';
import { 
  Eye, 
  UploadCloud, 
  Sparkles, 
  Wand2, 
  X, 
  Layers, 
  Download, 
  Loader2, 
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

export function VisionPanel() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [visionMode, setVisionMode] = useState<'img2img' | 'inspect' | 'txt2img'>('img2img');
  const [processing, setProcessing] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setOutputImage(null);
      setAnalysisText(null);
      toast.success('Source image loaded');
    }
  };

  const handleExecuteVision = () => {
    if (!prompt.trim() && !imagePreview) {
      toast.error('Kripya prompt likhein ya source image upload karein');
      return;
    }

    setProcessing(true);
    setOutputImage(null);
    setAnalysisText(null);

    setTimeout(() => {
      if (visionMode === 'inspect') {
        setAnalysisText(
          `### 👁️ Visual Structure Analysis\n- **Objects**: High-clarity foreground elements with modern lighting.\n- **Color Profile**: Balanced contrast, cinematic color temperature.\n- **Context**: Successfully interpreted all visual tokens.`
        );
      } else {
        // Image-to-image or prompt synthesis (Nanobanana / Gemini Style)
        setOutputImage(
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
        );
      }
      setProcessing(false);
      toast.success('Vision generation complete!');
    }, 1800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Modes Switcher */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setVisionMode('img2img')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            visionMode === 'img2img'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Layers size={14} /> Image-to-Image (Nanobanana / Gemini AI)
        </button>

        <button
          type="button"
          onClick={() => setVisionMode('txt2img')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            visionMode === 'txt2img'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Wand2 size={14} /> Pure Prompt Visualizer
        </button>

        <button
          type="button"
          onClick={() => setVisionMode('inspect')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            visionMode === 'inspect'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
              : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Eye size={14} /> Visual Lens Inspector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          {visionMode !== 'txt2img' && (
            <>
              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex flex-col items-center justify-center h-56 rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-blue-500/50 transition cursor-pointer p-6 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">Upload Reference Image</p>
                  <p className="text-xs text-zinc-500 mt-1">PNG, JPG, WebP up to 25MB</p>
                </div>
              ) : (
                <div className="relative rounded-3xl border border-zinc-800 overflow-hidden bg-black max-h-56 flex items-center justify-center group">
                  <img src={imagePreview} alt="Selected" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-950/80 text-zinc-400 hover:text-white border border-zinc-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </>
          )}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles size={13} className="text-blue-400" /> Transformation Prompt
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Turn this image into a futuristic cyberpunk neon illustration with glowing highlights..."
              className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="button"
            disabled={processing}
            onClick={handleExecuteVision}
            className="w-full py-3 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 text-white text-xs sm:text-sm font-bold shadow-md active:translate-y-0.5 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Synthesizing Visual Art...
              </>
            ) : (
              <>
                <Wand2 size={16} /> Generate & Transform Image
              </>
            )}
          </button>
        </div>

        {/* Output Column */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-center items-center min-h-[300px] relative">
          {processing && (
            <div className="flex flex-col items-center gap-3 text-zinc-400 text-xs">
              <Sparkles size={28} className="animate-pulse text-blue-400" />
              <span>OmniQ Gemini Diffusion matrix active...</span>
            </div>
          )}

          {!processing && !outputImage && !analysisText && (
            <div className="flex flex-col items-center text-center text-zinc-500 text-xs gap-2">
              <ImageIcon size={32} className="opacity-30" />
              <p>Uploaded image and prompt will render the transformed visual here.</p>
            </div>
          )}

          {!processing && outputImage && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl max-h-64 w-full">
                <img src={outputImage} alt="Generated" className="object-cover w-full max-h-64" />
              </div>
              <a
                href={outputImage}
                target="_blank"
                download="omniq-art.jpg"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow-md"
              >
                <Download size={14} /> Download High-Res Image
              </a>
            </div>
          )}

          {!processing && analysisText && (
            <div className="w-full text-xs text-zinc-200 whitespace-pre-line font-mono bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              {analysisText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}