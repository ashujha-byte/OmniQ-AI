export type ToolMode = 'search' | 'vision' | 'generate' | 'video';

export interface Citation {
  title: string;
  uri: string;
  snippet?: string;
}

export interface SearchResult {
  query: string;
  answer: string;
  citations: Citation[];
  metadata: {
    model: string;
    groundingEnabled: boolean;
    timestamp: string;
  };
}

export interface VisionResult {
  prompt: string;
  analysis: string;
  label: string;
  confidence: string;
  details: string[];
  metadata: {
    model: string;
    timestamp: string;
  };
}

export interface GenerateResult {
  prompt: string;
  images: { data: string; mimeType: string }[];
  metadata: {
    model: string;
    timestamp: string;
    count: number;
  };
}

export interface ProcessingStep {
  name: string;
  status: 'pending' | 'processing' | 'completed';
  description: string;
}

export interface ShortClip {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  aspectRatio: string;
  captionPreview: string;
  status: 'pending' | 'ready';
}

export interface VideoProcessResult {
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

export interface ToolConfig {
  id: ToolMode;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
