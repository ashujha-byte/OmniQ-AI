import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

interface GenerateResult {
  prompt: string;
  images: { data: string; mimeType: string }[];
  metadata: {
    model: string;
    timestamp: string;
    count: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, count } = (await req.json()) as {
      prompt: string;
      style?: string;
      count?: number;
    };

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'A text prompt is required for image generation.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const styleSuffix = style ? ` Style: ${style}.` : '';
    const fullPrompt = `Generate a high-quality, professional image: ${prompt}${styleSuffix}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: fullPrompt,
      config: {
        temperature: 0.9,
      },
    });

    const images: { data: string; mimeType: string }[] = [];

    const parts = (response as any)?.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        images.push({
          data: part.inlineData.data,
          mimeType: part.inlineData.mimeType || 'image/png',
        });
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        {
          error:
            'The model did not return an image. Try adjusting your prompt.',
          prompt: fullPrompt,
          images: [],
          metadata: {
            model: 'gemini-2.5-flash-image',
            timestamp: new Date().toISOString(),
            count: 0,
          },
        },
        { status: 200 }
      );
    }

    const result: GenerateResult = {
      prompt: fullPrompt,
      images: images.slice(0, count || 1),
      metadata: {
        model: 'gemini-2.5-flash-image',
        timestamp: new Date().toISOString(),
        count: images.length,
      },
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Generate API Error]', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'An unexpected error occurred during image generation.',
      },
      { status: 500 }
    );
  }
}
