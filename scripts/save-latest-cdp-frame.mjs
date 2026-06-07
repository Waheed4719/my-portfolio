import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , outPath, markerPath] = process.argv;

if (!outPath) {
  console.error('Usage: node scripts/save-latest-cdp-frame.mjs <output-path> [marker-path]');
  process.exit(1);
}

const logDir = '/Users/red4719/.cursor/browser-logs';
const marker = markerPath ? Number(fs.readFileSync(markerPath, 'utf8')) : 0;

const files = fs
  .readdirSync(logDir)
  .filter((name) => name.startsWith('cdp-response-Page.captureScreenshot-'))
  .map((name) => ({ name, mtime: fs.statSync(path.join(logDir, name)).mtimeMs }))
  .filter((entry) => entry.mtime > marker)
  .sort((a, b) => a.mtime - b.mtime);

if (!files.length) {
  console.error('No new CDP screenshot JSON found');
  process.exit(1);
}

const latest = path.join(logDir, files[files.length - 1].name);
execFileSync('node', ['/Users/red4719/my-portfolio/scripts/save-cdp-frame.mjs', latest, outPath], {
  stdio: 'inherit',
});

if (markerPath) {
  fs.writeFileSync(markerPath, String(files[files.length - 1].mtime));
}
