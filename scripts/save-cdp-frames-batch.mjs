import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , framesDir, startFrame, count, afterMtime] = process.argv;

if (!framesDir || startFrame === undefined || !count) {
  console.error('Usage: node scripts/save-cdp-frames-batch.mjs <frames-dir> <start-frame> <count> [after-mtime-ms]');
  process.exit(1);
}

const logDir = '/Users/red4719/.cursor/browser-logs';
const threshold = afterMtime ? Number(afterMtime) : 0;

const files = fs
  .readdirSync(logDir)
  .filter((name) => name.startsWith('cdp-response-Page.captureScreenshot-'))
  .map((name) => {
    const full = path.join(logDir, name);
    return { full, mtime: fs.statSync(full).mtimeMs };
  })
  .filter((entry) => entry.mtime > threshold)
  .sort((a, b) => a.mtime - b.mtime)
  .slice(0, Number(count));

if (files.length < Number(count)) {
  console.error(`Expected ${count} new screenshots, found ${files.length}`);
  process.exit(1);
}

let frame = Number(startFrame);
for (const file of files) {
  const out = path.join(framesDir, `frame-${String(frame).padStart(3, '0')}.png`);
  execFileSync('node', ['/Users/red4719/my-portfolio/scripts/save-cdp-frame.mjs', file.full, out], {
    stdio: 'inherit',
  });
  frame += 1;
}

console.log(`saved frames ${startFrame}-${frame - 1}`);
