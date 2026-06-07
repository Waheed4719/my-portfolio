import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 10;
const SECONDS = 6;
const FRAME_COUNT = FPS * SECONDS;
const OUT_DIR = path.join(process.cwd(), 'public', 'showcase');
const TMP_DIR = path.join(process.cwd(), '.tmp-showcase');

const CHROME_PATH =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const targets = [
  {
    name: 'collect-car',
    url: 'https://collect-car.vercel.app/',
    prepare: async (page) => {
      await page.waitForTimeout(3500);
    },
  },
  {
    name: 'fizzi',
    url: 'https://fizzi-clone.vercel.app/',
    prepare: async (page) => {
      await page.waitForTimeout(3000);
      for (let i = 0; i < 5; i += 1) {
        await page.mouse.wheel({ deltaY: 550 });
        await page.waitForTimeout(400);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
    },
  },
];

function framesToGif(framesDir, gifPath) {
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
}

async function captureFrames(page, framesDir, prepare) {
  fs.mkdirSync(framesDir, { recursive: true });
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await prepare(page);

  for (let i = 0; i < FRAME_COUNT; i += 1) {
    const framePath = path.join(framesDir, `frame-${String(i).padStart(3, '0')}.png`);
    await page.screenshot({ path: framePath, type: 'png' });
    await page.waitForTimeout(1000 / FPS);
  }
}

async function capture() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: WIDTH, height: HEIGHT },
  });

  const page = await browser.newPage();

  for (const target of targets) {
    console.log(`Capturing ${target.name}...`);
    const framesDir = path.join(TMP_DIR, target.name);
    fs.rmSync(framesDir, { recursive: true, force: true });

    await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await captureFrames(page, framesDir, target.prepare);

    const gifPath = path.join(OUT_DIR, `${target.name}.gif`);
    console.log(`Building ${target.name}.gif...`);
    framesToGif(framesDir, gifPath);

    const sizeMb = (fs.statSync(gifPath).size / 1024 / 1024).toFixed(2);
    console.log(`Saved ${gifPath} (${sizeMb} MB)`);
  }

  await browser.close();
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
