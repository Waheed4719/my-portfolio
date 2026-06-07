export type BackgroundTrack = {
  title: string;
  artist: string;
  src: string;
};

const AUDIO_EXTENSIONS = /\.(mp3|m4a|wav|ogg|aac|flac)$/i;

export function isAudioFile(filename: string) {
  return (
    AUDIO_EXTENSIONS.test(filename) &&
    !filename.startsWith('.') &&
    filename !== '.DS_Store'
  );
}

export function parseAudioFilename(filename: string): BackgroundTrack {
  const src = `/audio/${encodeURIComponent(filename)}`;
  const base = filename.replace(/\.[^.]+$/i, '');

  if (base.includes(' - ')) {
    const [artist, ...titleParts] = base.split(' - ');
    return {
      artist: formatLabel(artist),
      title: formatLabel(titleParts.join(' - ')),
      src,
    };
  }

  return {
    title: formatLabel(base),
    artist: '',
    src,
  };
}

function formatLabel(value: string) {
  return value
    .trim()
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function shuffleTracks(
  tracks: BackgroundTrack[],
  avoidFirst?: BackgroundTrack,
) {
  const pool = [...tracks];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  if (avoidFirst && pool.length > 1 && pool[0].src === avoidFirst.src) {
    [pool[0], pool[1]] = [pool[1], pool[0]];
  }

  return pool;
}
