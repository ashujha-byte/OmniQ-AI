import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface VideoProcessResult {
  source: string;
  sourceType: 'youtube' | 'upload';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  jobId: string;
  steps: ProcessingStep[];
  transcript?: string;
  shorts: ShortClip[];
  metadata: {
    timestamp: string;
    estimatedDuration: string;
  };
}

interface ProcessingStep {
  name: string;
  status: 'pending' | 'processing' | 'completed';
  description: string;
}

interface ShortClip {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  aspectRatio: string;
  captionPreview: string;
  status: 'pending' | 'ready';
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, type } = body as { source: string; type: 'youtube' | 'upload' };

    if (!source) {
      return NextResponse.json(
        { error: 'A video source (YouTube URL or file reference) is required.' },
        { status: 400 }
      );
    }

    let sourceType: 'youtube' | 'upload' = type || 'upload';
    let youtubeId: string | null = null;

    if (source.includes('youtube') || source.includes('youtu.be')) {
      sourceType = 'youtube';
      youtubeId = extractYouTubeId(source);
      if (!youtubeId) {
        return NextResponse.json(
          { error: 'Invalid YouTube URL. Could not extract video ID.' },
          { status: 400 }
        );
      }
    }

    const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const steps: ProcessingStep[] = [
      {
        name: 'Whisper Transcription',
        status: 'completed',
        description: 'Audio extracted and transcribed via Whisper ASR',
      },
      {
        name: 'Scene Detection',
        status: 'completed',
        description: 'Key moments identified using semantic segmentation',
      },
      {
        name: '9:16 Framing',
        status: 'processing',
        description: 'Cropping and reframing to vertical aspect ratio',
      },
      {
        name: 'Auto-Captioning',
        status: 'pending',
        description: 'Burned-in word-level captions styled for shorts',
      },
    ];

    const mockTranscript = youtubeId
      ? `[Transcription placeholder for YouTube video ${youtubeId}] The content has been analyzed and key segments identified for short-form conversion.`
      : '[Transcription placeholder for uploaded video] The audio track has been processed and segmented.';

    const shorts: ShortClip[] = [
      {
        id: 'clip_1',
        title: 'Hook — Opening segment',
        startTime: 0,
        endTime: 45,
        aspectRatio: '9:16',
        captionPreview: 'Wait for it...',
        status: 'ready',
      },
      {
        id: 'clip_2',
        title: 'Key insight — Main topic',
        startTime: 78,
        endTime: 120,
        aspectRatio: '9:16',
        captionPreview: 'Here is the thing...',
        status: 'pending',
      },
      {
        id: 'clip_3',
        title: 'Conclusion — Call to action',
        startTime: 245,
        endTime: 288,
        aspectRatio: '9:16',
        captionPreview: 'Subscribe for more!',
        status: 'pending',
      },
    ];

    const result: VideoProcessResult = {
      source: youtubeId ? `https://youtube.com/watch?v=${youtubeId}` : source,
      sourceType,
      status: 'processing',
      jobId,
      steps,
      transcript: mockTranscript,
      shorts,
      metadata: {
        timestamp: new Date().toISOString(),
        estimatedDuration: '3-5 min',
      },
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Video API Error]', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'An unexpected error occurred while processing the video.',
      },
      { status: 500 }
    );
  }
}
