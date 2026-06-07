import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'node:fs';
import path from 'node:path';

const FPS = 10;

const [, , framesDir, outBase] = process.argv;

if (!framesDir || !outBase) {
  console.error('Usage: node scripts/frames-to-video.mjs <frames-dir> <output-base>');
  process.exit(1);
}

const mp4Path = `${outBase}.mp4`;
const input = path.join(framesDir, 'frame-%03d.png');
const startNumber = outBase.endsWith('fizzi') ? 10 : 0;
const frameCount = outBase.endsWith('fizzi') ? 40 : 50;

execFileSync(ffmpegPath, [
  '-y',
  '-framerate',
  String(FPS),
  '-start_number',
  String(startNumber),
  '-i',
  input,
  '-vframes',
  String(frameCount),
  '-c:v',
  'libx264',
  '-preset',
  'medium',
  '-crf',
  '23',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  mp4Path,
]);

const sizeMb = (fs.statSync(mp4Path).size / 1024 / 1024).toFixed(2);
console.log(`${mp4Path} (${sizeMb} MB)`);
