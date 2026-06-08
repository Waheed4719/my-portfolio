import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 1920;
const HEIGHT = 1080;
const OUT_DIR = path.join(process.cwd(), 'public', 'showcase');
const TMP_DIR = path.join(process.cwd(), '.tmp-showcase');

// Measured on fizzi-clone @ 1920×1080:
// hero ≈ 2200px (200vh), skydive pin = 100vh + 2000px, choose flavor @ 5280px.
const FIZZI_SCROLL = {
  heroEnd: 2200,
  chooseFlavorY: 5280,
  heroScrollMs: 8000,
  skydiveScrollMs: 10000,
  flavorPauseMs: 1500,
  finaleScrollMs: 6000,
};

const CHROME_ARGS = [
  '--force-device-scale-factor=1',
  '--high-dpi-support=1',
  '--disable-dev-shm-usage',
  '--enable-webgl',
  '--ignore-gpu-blocklist',
  '--autoplay-policy=no-user-gesture-required',
];

const CAPTURE_FIX_CSS = `
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
  }
`;

const ALL_TARGETS = {
  fizzi: {
    name: 'fizzi',
    url: 'https://fizzi-clone.vercel.app/',
    loadWaitMs: 3000,
    sceneSettleMs: 5000,
    durationMs: 27500,
    action: captureFizzi,
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function convertWebmToMp4(webmPath, mp4Path, { trimStartSec = 0, durationSec } = {}) {
  const args = ['-y'];
  if (trimStartSec > 0) args.push('-ss', String(trimStartSec));
  args.push('-i', webmPath);
  if (durationSec) args.push('-t', String(durationSec));
  args.push(
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-an',
    mp4Path,
  );
  execFileSync(ffmpegPath, args);
}

async function applyCaptureFixes(page) {
  await page.addStyleTag({ content: CAPTURE_FIX_CSS });
}

async function ensureNativeZoom(page) {
  const client = await page.context().newCDPSession(page);

  await client.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  // Reset any persisted Chrome zoom (Cmd/Ctrl+0).
  const resetZoom = process.platform === 'darwin' ? 'Meta+0' : 'Control+0';
  await page.keyboard.press(resetZoom).catch(() => {});

  await sleep(300);
}

async function getPageScrollMetrics(page) {
  return page.evaluate(() => ({
    maxScroll: Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    devicePixelRatio: window.devicePixelRatio,
    pageScale: window.visualViewport?.scale ?? 1,
    visualWidth: window.visualViewport?.width ?? window.innerWidth,
  }));
}

async function prepareCaptureWindow(page, name) {
  await ensureNativeZoom(page);

  const metrics = await getPageScrollMetrics(page);
  console.log(
    `  Viewport ${metrics.innerWidth}x${metrics.innerHeight} @${metrics.devicePixelRatio}x, zoom ${metrics.pageScale}x (document ${metrics.scrollWidth}px)`,
  );

  if (metrics.innerWidth !== WIDTH || metrics.innerHeight !== HEIGHT) {
    throw new Error(
      `Viewport is ${metrics.innerWidth}x${metrics.innerHeight}, expected ${WIDTH}x${HEIGHT}`,
    );
  }

  if (Math.abs(metrics.pageScale - 1) > 0.01) {
    throw new Error(
      `Browser zoom is ${metrics.pageScale}x — reset Chrome to 100% (Cmd+0) and rerun`,
    );
  }

  await applyCaptureFixes(page);

  fs.mkdirSync(TMP_DIR, { recursive: true });
  const probe = path.join(TMP_DIR, `probe-${name}.jpg`);
  await page.screenshot({
    path: probe,
    type: 'jpeg',
    quality: 92,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
  console.log(`  Probe saved: ${probe}`);
}

async function waitForSceneReady(page, { settleMs = 6000 } = {}) {
  console.log('  Waiting for 3D scene to load...');

  try {
    await page.waitForSelector('canvas', { timeout: 30000 });
  } catch {
    console.log('  No canvas yet — using timed settle');
  }

  let ready = false;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    ready = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas || canvas.width < 32 || canvas.height < 32) return false;
      try {
        return canvas.toDataURL('image/jpeg', 0.6).length > 5000;
      } catch {
        return true;
      }
    });
    if (ready) break;
    await sleep(500);
  }

  if (!ready) {
    console.log('  Scene settle fallback');
    await sleep(settleMs);
    return;
  }

  await sleep(2000);
}

async function smoothScrollTo(page, targetY, durationMs) {
  await page.evaluate(
    async ({ targetY, durationMs }) => {
      const ease = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
      const startY = window.scrollY;
      const start = performance.now();

      await new Promise((resolve) => {
        const step = (now) => {
          const t = Math.min(1, (now - start) / durationMs);
          window.scrollTo(0, startY + (targetY - startY) * ease(t));
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });
    },
    { targetY, durationMs },
  );
}

async function clickFlavorButton(page, label) {
  const clicked = await page.evaluate((buttonLabel) => {
    const button = [...document.querySelectorAll('button')].find(
      (el) => el.textContent?.trim().toLowerCase() === buttonLabel,
    );
    if (!button) return false;
    button.click();
    return true;
  }, label);

  if (!clicked) {
    throw new Error(`Could not find flavor carousel "${label}" button`);
  }
}

async function captureFizzi(page) {
  const {
    heroEnd,
    chooseFlavorY,
    heroScrollMs,
    skydiveScrollMs,
    flavorPauseMs,
    finaleScrollMs,
  } = FIZZI_SCROLL;

  const metrics = await getPageScrollMetrics(page);
  console.log(`  Max scroll ${metrics.maxScroll}px`);

  console.log('  → Hero: two cans become five flavours (~200vh)');
  await smoothScrollTo(page, heroEnd, heroScrollMs);

  console.log('  → Skydive: continuous scroll through pin (100vh + 2000px)');
  await smoothScrollTo(page, chooseFlavorY, skydiveScrollMs);

  console.log('  → Choose Your Flavor: next + previous');
  await clickFlavorButton(page, 'next');
  await sleep(flavorPauseMs);
  await clickFlavorButton(page, 'previous');
  await sleep(flavorPauseMs);

  const endMetrics = await getPageScrollMetrics(page);
  console.log(`  → Finale: scroll to page end (${endMetrics.maxScroll}px)`);
  await smoothScrollTo(page, endMetrics.maxScroll, finaleScrollMs);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await sleep(800);
}

async function recordTarget({
  name,
  url,
  durationMs,
  preRecordWaitMs = 0,
  loadWaitMs = 2500,
  action,
  sceneSettleMs = 6000,
}) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Recording ${name}...`);
  console.log('  Playwright viewport video @ 1920x1080 — keep Chrome window unobstructed');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: CHROME_ARGS,
  });

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: TMP_DIR,
      size: { width: WIDTH, height: HEIGHT },
    },
  });

  const recordingStartedAt = Date.now();
  const page = await context.newPage();
  const mp4Path = path.join(OUT_DIR, `${name}.mp4`);

  await ensureNativeZoom(page);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
  await sleep(2000);
  await prepareCaptureWindow(page, name);
  await sleep(loadWaitMs);
  await waitForSceneReady(page, { settleMs: sceneSettleMs });

  if (preRecordWaitMs > 0) {
    console.log(
      `  Waiting ${(preRecordWaitMs / 1000).toFixed(1)}s before capture segment...`,
    );
    await sleep(preRecordWaitMs);
  }

  const actionStartedAt = Date.now();
  console.log(`  Capturing ~${(durationMs / 1000).toFixed(1)}s`);
  await action(page);

  const elapsed = Date.now() - actionStartedAt;
  const remaining = Math.max(0, durationMs - elapsed);
  if (remaining > 0) await sleep(remaining);

  const actionEndedAt = Date.now();
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  const webmPath = await video.path();
  const trimStartSec = (actionStartedAt - recordingStartedAt) / 1000;
  const trimDurationSec = (actionEndedAt - actionStartedAt) / 1000;

  console.log(
    `  Trimming ${trimStartSec.toFixed(1)}s–${(trimStartSec + trimDurationSec).toFixed(1)}s from recording`,
  );

  convertWebmToMp4(webmPath, mp4Path, {
    trimStartSec,
    durationSec: trimDurationSec,
  });
  fs.unlinkSync(webmPath);

  const sizeMb = (fs.statSync(mp4Path).size / 1024 / 1024).toFixed(2);
  console.log(`Saved ${mp4Path} (${sizeMb} MB)`);
}

function resolveTargets() {
  const arg = process.argv[2];
  if (!arg || arg === 'fizzi') return [ALL_TARGETS.fizzi];
  if (ALL_TARGETS[arg]) return [ALL_TARGETS[arg]];
  throw new Error(`Unknown target "${arg}". Use: fizzi`);
}

const targets = resolveTargets();

console.log(`Capturing: ${targets.map((t) => t.name).join(', ')}`);
console.log('Locks Chrome to 100% zoom @ 1920x1080. Check .tmp-showcase/probe-fizzi.jpg first.');

for (const target of targets) {
  await recordTarget(target);
}

fs.rmSync(TMP_DIR, { recursive: true, force: true });
console.log('Done.');
