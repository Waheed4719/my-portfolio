import { readdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { isAudioFile, parseAudioFilename } from '@/lib/audio-tracks';

export async function GET() {
  try {
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const files = await readdir(audioDir);

    const tracks = files
      .filter(isAudioFile)
      .map(parseAudioFilename)
      .sort((a, b) => a.src.localeCompare(b.src));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Failed to read audio tracks:', error);
    return NextResponse.json({ tracks: [] });
  }
}
