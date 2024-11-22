import { NextResponse } from 'next/server';
import { analyzeEssay } from '@/lib/gemini';
import { extractText } from '@/lib/document-parser';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const essayFile = formData.get('essay') as File;
    const webinarFile = formData.get('webinar') as File;

    const [essayText, webinarContent] = await Promise.all([
      extractText(essayFile),
      extractText(webinarFile)
    ]);

    const analysis = await analyzeEssay(essayText, webinarContent);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error grading essay:', error);
    return NextResponse.json(
      { error: 'Failed to grade essay' },
      { status: 500 }
    );
  }
}