import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface VisionResult {
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

function extractStructuredData(text: string) {
  const labelMatch = text.match(/(?:label|subject|object):\s*(.+)/i);
  const confidenceMatch = text.match(/confidence:\s*(\d+%?)/i);
  const detailLines = text
    .split('\n')
    .filter((l) => l.trim().startsWith('-') || l.trim().startsWith('•'))
    .map((l) => l.replace(/^[-•]\s*/, '').trim())
    .slice(0, 8);

  return {
    label: labelMatch?.[1]?.trim() || 'N/A',
    confidence: confidenceMatch?.[1]?.trim() || 'N/A',
    details: detailLines.length > 0 ? detailLines : [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, prompt, mimeType } = body as {
      image: string;
      prompt?: string;
      mimeType?: string;
    };

    if (!image || typeof image !== 'string') {
      return NextResponse.json(
        { error: 'Image data is required as a base64 string.' },
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

    const userPrompt =
      prompt?.trim() ||
      'Analyze this image. Provide: a label (what the main subject is), a confidence level, and 3-5 key observations as bullet points. Format as: Label: <text>\nConfidence: <text>\nDetails:\n- <point>\n- <point>';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: userPrompt },
            {
              inlineData: {
                data: image,
                mimeType: mimeType || 'image/jpeg',
              },
            },
          ],
        },
      ],
      config: {
        temperature: 0.4,
      },
    });

    const analysisText =
      (response as any)?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No analysis generated.';

    const structured = extractStructuredData(analysisText);

    const result: VisionResult = {
      prompt: userPrompt,
      analysis: analysisText,
      label: structured.label,
      confidence: structured.confidence,
      details: structured.details,
      metadata: {
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Vision API Error]', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'An unexpected error occurred while analyzing the image.',
      },
      { status: 500 }
    );
  }
}
