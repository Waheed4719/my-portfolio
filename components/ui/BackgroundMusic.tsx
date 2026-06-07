'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  HiMusicNote,
  HiPause,
  HiPlay,
  HiVolumeOff,
  HiVolumeUp,
} from 'react-icons/hi';
import { backgroundTracks, type BackgroundTrack } from '@/lib/data';

const VOLUME = 0.35;

function shuffleTracks(tracks: BackgroundTrack[], avoidFirst?: BackgroundTrack) {
  const pool = [...tracks];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  if (
    avoidFirst &&
    pool.length > 1 &&
    pool[0].src === avoidFirst.src
  ) {
    [pool[0], pool[1]] = [pool[1], pool[0]];
  }

  return pool;
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const failedTracks = useRef(new Set<string>());
  const [queue, setQueue] = useState<BackgroundTrack[]>(() =>
    shuffleTracks(backgroundTracks),
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [missingFiles, setMissingFiles] = useState(false);

  const current = queue[index];

  const advanceTrack = useCallback(() => {
    setIndex((prev) => {
      if (prev + 1 < queue.length) return prev + 1;

      const last = queue[prev];
      setQueue(shuffleTracks(backgroundTracks, last));
      return 0;
    });
  }, [queue]);

  const skipBrokenTrack = useCallback(() => {
    if (!current) return;

    failedTracks.current.add(current.src);

    if (failedTracks.current.size >= backgroundTracks.length) {
      setMissingFiles(true);
      setPlaying(false);
      return;
    }

    advanceTrack();
  }, [advanceTrack, current]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || missingFiles || !current) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.src = current.src;
    audio.load();

    try {
      await audio.play();
      failedTracks.current.delete(current.src);
      setMissingFiles(false);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!playing || !current) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = current.src;
    audio.load();
    audio.play().catch(() => setPlaying(false));
  }, [current, playing]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={advanceTrack}
        onError={skipBrokenTrack}
      />

      {expanded && current && !missingFiles && (
        <div className="glass max-w-[220px] rounded-2xl px-4 py-3 text-right shadow-lg shadow-black/30">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand">
            Now playing
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-white">
            {current.title}
          </p>
          <p className="font-mono text-xs text-white/50">{current.artist}</p>
        </div>
      )}

      <div className="glass flex items-center gap-1 rounded-full p-1 shadow-lg shadow-black/30">
        {!missingFiles && (
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={muted ? 'Unmute music' : 'Mute music'}
          >
            {muted ? (
              <HiVolumeOff className="text-lg" />
            ) : (
              <HiVolumeUp className="text-lg" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (!expanded && !missingFiles) setExpanded(true);
            void togglePlay();
          }}
          onMouseEnter={() => !missingFiles && setExpanded(true)}
          onFocus={() => !missingFiles && setExpanded(true)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${
            missingFiles
              ? 'cursor-not-allowed text-white/30'
              : playing
                ? 'bg-brand text-white'
                : 'bg-white/10 text-brand hover:bg-brand/20'
          }`}
          aria-label={
            missingFiles
              ? 'Add MP3 files to public/audio'
              : playing
                ? 'Pause background music'
                : 'Play background music'
          }
          title={
            missingFiles
              ? 'Drop MP3s into public/audio/ (see filenames in lib/data.ts)'
              : undefined
          }
        >
          {missingFiles ? (
            <HiMusicNote className="text-lg" />
          ) : playing ? (
            <HiPause className="text-lg" />
          ) : (
            <HiPlay className="ml-0.5 text-lg" />
          )}
        </button>
      </div>
    </div>
  );
}
