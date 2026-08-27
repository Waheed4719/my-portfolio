'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  HiMusicNote,
  HiPause,
  HiPlay,
  HiVolumeOff,
  HiVolumeUp,
  HiChevronRight,
} from 'react-icons/hi';
import {
  shuffleTracks,
  type BackgroundTrack,
} from '@/lib/audio-tracks';

const VOLUME = 0.15;

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const allTracksRef = useRef<BackgroundTrack[]>([]);
  const failedTracks = useRef(new Set<string>());
  const hasStartedRef = useRef(false);
  const [queue, setQueue] = useState<BackgroundTrack[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [missingFiles, setMissingFiles] = useState(false);
  const [loading, setLoading] = useState(true);

  const current = queue[index];

  const playTrack = useCallback(async (track: BackgroundTrack) => {
    const audio = audioRef.current;
    if (!audio) return false;

    audio.src = track.src;
    audio.load();

    try {
      await audio.play();
      failedTracks.current.delete(track.src);
      setMissingFiles(false);
      setPlaying(true);
      hasStartedRef.current = true;
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/tracks')
      .then((res) => res.json())
      .then((data: { tracks?: BackgroundTrack[] }) => {
        if (cancelled) return;

        const tracks = data.tracks ?? [];
        allTracksRef.current = tracks;

        if (tracks.length === 0) {
          setMissingFiles(true);
          setQueue([]);
          return;
        }

        setMissingFiles(false);
        setQueue(shuffleTracks(tracks));
        setIndex(0);
      })
      .catch(() => {
        if (!cancelled) setMissingFiles(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const advanceTrack = useCallback(() => {
    const allTracks = allTracksRef.current;
    if (allTracks.length === 0) return;

    setIndex((prev) => {
      if (prev + 1 < queue.length) return prev + 1;

      const last = queue[prev];
      setQueue(shuffleTracks(allTracks, last));
      return 0;
    });
  }, [queue]);

  const skipBrokenTrack = useCallback(() => {
    if (!current) return;

    failedTracks.current.add(current.src);
    const allTracks = allTracksRef.current;

    if (failedTracks.current.size >= allTracks.length) {
      setMissingFiles(true);
      setPlaying(false);
      return;
    }

    advanceTrack();
  }, [advanceTrack, current]);

  useEffect(() => {
    if (!playing || !current || !hasStartedRef.current) return;
    void playTrack(current);
  }, [current, playing, playTrack]);

  const togglePlay = async () => {
    if (missingFiles || loading || !current) return;

    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }

    await playTrack(current);
  };

  const playNext = () => {
    if (missingFiles || loading || queue.length === 0) return;
    setExpanded(true);
    advanceTrack();
    if (!playing) setPlaying(true);
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

  const showControls = !loading && !missingFiles;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={advanceTrack}
        onError={skipBrokenTrack}
      />

      {expanded && current && showControls && (
        <div className="glass max-w-[220px] rounded-2xl px-4 py-3 text-right shadow-lg shadow-black/30">
          <p className="type-eyebrow text-[10px]">Now playing</p>
          <p className="type-card-title mt-1 text-sm text-white">{current.title}</p>
          {current.artist && (
            <p className="type-label text-xs text-white/50">{current.artist}</p>
          )}
        </div>
      )}

      <div className="glass flex items-center gap-1 rounded-full p-1 shadow-lg shadow-black/30">
        {showControls && (
          <>
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

            <button
              type="button"
              onClick={playNext}
              onMouseEnter={() => setExpanded(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next track"
            >
              <HiChevronRight className="text-lg" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => {
            if (!expanded && showControls) setExpanded(true);
            void togglePlay();
          }}
          onMouseEnter={() => showControls && setExpanded(true)}
          onFocus={() => showControls && setExpanded(true)}
          disabled={loading}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${
            loading
              ? 'cursor-wait text-white/30'
              : missingFiles
                ? 'cursor-not-allowed text-white/30'
                : playing
                  ? 'bg-brand text-white'
                  : 'bg-white/10 text-brand hover:bg-brand/20'
          }`}
          aria-label={
            loading
              ? 'Loading music'
              : missingFiles
                ? 'Add audio files to public/audio'
                : playing
                  ? 'Pause background music'
                  : 'Play background music'
          }
          title={
            missingFiles
              ? 'Drop audio files into public/audio/'
              : undefined
          }
        >
          {loading ? (
            <HiMusicNote className="animate-pulse text-lg" />
          ) : missingFiles ? (
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
