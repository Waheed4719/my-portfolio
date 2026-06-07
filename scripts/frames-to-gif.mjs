import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 10;

const [, , framesDir, gifPath] = process.argv;

if (!framesDir || !gifPath) {
  console.error('Usage: node scripts/frames-to-gif.mjs <frames-dir> <output.gif>');
  process.exit(1);
}

const palettePath = path.join(framesDir, 'palette.png');

execFileSync(ffmpegPath, [
  '-y',
  '-framerate',
  String(FPS),
  '-i',
  path.join(framesDir, 'frame-%03d.png'),
  '-vf',
  `fps=${FPS},scale=${WIDTH}:${HEIGHT}:flags=lanczos,palettegen=max_colors=128:stats_mode=diff`,
  palettePath,
]);

execFileSync(ffmpegPath, [
  '-y',
  '-framerate',
  String(FPS),
  '-i',
  path.join(framesDir, 'frame-%03d.png'),
  '-i',
  palettePath,
  '-lavfi',
  `fps=${FPS},scale=${WIDTH}:${HEIGHT}:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=4`,
  '-loop',
  '0',
  gifPath,
]);

fs.unlinkSync(palettePath);
console.log(`Created ${gifPath} (${(fs.statSync(gifPath).size / 1024 / 1024).toFixed(2)} MB)`);
