import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw, Repeat, Gauge, Music, Mic, Headphones } from 'lucide-react';

interface EnhancedAudioPlayerProps {
  poemTitle: string;
  linesCount: number;
  audioRecitationUrl?: string;
  audioSongUrl?: string;
  onLineChange?: (lineIndex: number) => void;
}

type AudioMode = 'recitation' | 'song' | 'follow';

export function EnhancedAudioPlayer({ poemTitle, linesCount, audioRecitationUrl, audioSongUrl, onLineChange }: EnhancedAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [isSentenceMode, setIsSentenceMode] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [mode, setMode] = useState<AudioMode>('recitation');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentLineRef = useRef<number>(-1);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);

  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  const computeLineIndex = (time: number, totalDuration: number) => {
    if (totalDuration <= 0 || linesCount === 0) return -1;
    const percent = Math.min(Math.max(time / totalDuration, 0), 1);
    return Math.min(linesCount - 1, Math.floor(percent * linesCount));
  };

  const getActiveAudioUrl = () => {
    if (mode === 'song' && audioSongUrl) return audioSongUrl;
    return audioRecitationUrl || audioSongUrl;
  };

  const activeAudioUrl = getActiveAudioUrl();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      const time = audio.currentTime;
      setCurrentTime(time);

      const line = computeLineIndex(time, audio.duration);
      if (line !== currentLineRef.current) {
        // Pause at the end of each line in sentence mode
        if (isSentenceMode && currentLineRef.current !== -1) {
          audio.pause();
          setIsPlaying(false);
        }
        currentLineRef.current = line;
        onLineChange?.(line);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      clearLoadingTimeout();
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      clearLoadingTimeout();
      console.log('Audio can play:', activeAudioUrl);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      clearLoadingTimeout();
      console.log('Audio loaded data');
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      clearLoadingTimeout();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [linesCount, onLineChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = isLooping;
    audio.playbackRate = playbackSpeed;
  }, [isLooping, playbackSpeed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      seek(event.clientX);
    };

    const handlePointerUpOrCancel = (event: PointerEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove, { passive: false });
      window.addEventListener('pointerup', handlePointerUpOrCancel, { passive: false });
      window.addEventListener('pointercancel', handlePointerUpOrCancel, { passive: false });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUpOrCancel);
      window.removeEventListener('pointercancel', handlePointerUpOrCancel);
    };
  }, [isDragging]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!activeAudioUrl) return;

    setCurrentTime(0);
    setDuration(0);
    currentLineRef.current = -1;
    onLineChange?.(0);

    // When URL changes, reset and load the new source.
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
    audio.load();
  }, [activeAudioUrl, onLineChange]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      if (audio.currentTime >= (audio.duration || 0)) {
        audio.currentTime = 0;
        currentLineRef.current = -1;
        onLineChange?.(0);
      }

      setIsLoading(true);
      clearLoadingTimeout();
      loadingTimeoutRef.current = window.setTimeout(() => {
        console.warn('Audio loading timeout:', activeAudioUrl);
        setIsLoading(false);
        loadingTimeoutRef.current = null;
      }, 15000);

      // Ensure the browser has started fetching the media.
      if (audio.readyState === 0) {
        audio.load();
      }

      await audio.play();
      clearLoadingTimeout();
      setIsLoading(false);
      setIsPlaying(true);

      if (currentLineRef.current < 0) {
        currentLineRef.current = 0;
        onLineChange?.(0);
      }
    } catch (error) {
      console.error('Audio play failed:', error);
      clearLoadingTimeout();
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    currentLineRef.current = -1;
    onLineChange?.(0);
  };

  const toggleSpeed = () => {
    setPlaybackSpeed(prev => {
      if (prev === 0.75) return 1;
      if (prev === 1) return 1.25;
      return 0.75;
    });
  };


  const toggleLoop = () => {
    setIsLooping(prev => !prev);
  };

  const seek = (clientX: number) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percent = clickX / rect.width;
    const newTime = percent * (audio.duration || 0);
    
    if (!isNaN(newTime) && isFinite(newTime)) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      
      // Update line highlighting during seek
      const line = computeLineIndex(newTime, audio.duration || 0);
      if (line !== currentLineRef.current) {
        currentLineRef.current = line;
        onLineChange?.(line);
      }
    }
  };

  const handleSeekPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const progress = progressRef.current;
    if (!progress) return;
    event.preventDefault();

    setIsDragging(true);
    seek(event.clientX);
  };

  const formatTime = (seconds: number) => {
    const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
    const mins = Math.floor(safe / 60);
    const secs = Math.floor(safe % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5a9]/30 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-5 h-5 text-[#8b7355]" />
        <div className="flex-1">
          <p className="text-sm font-medium text-[#3d3229]">Learn poetry through music: recite, sing, and follow along</p>
          <p className="text-xs text-[#a89984]">
            Mode: {mode === 'recitation' ? 'Recitation - Listen to standard pronunciation' : mode === 'song' ? 'Singing - Sing along with the song version' : 'Follow-along - Read along with the audio'}
          </p>
        </div>
      </div>

      {activeAudioUrl ? (
        <audio
        ref={audioRef}
        src={activeAudioUrl}
        preload="auto"
        playsInline
        controls={false}
      />
      ) : (
        <p className="text-xs text-[#a89984] mb-4">
          No audio available for this poem yet.
        </p>
      )}

      {/* Modes */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setMode('recitation')}
          className={`flex-1 rounded-xl py-2 text-xs font-medium transition-all ${
            mode === 'recitation'
              ? 'bg-[#8b7355] text-white'
              : 'bg-[#f5f1e8] text-[#8b7355] hover:bg-[#ebe4d5]'
          }`}
        >
          <Mic className="inline w-4 h-4 mr-2" />
          Recitation
        </button>
        <button
          type="button"
          onClick={() => setMode('song')}
          className={`flex-1 rounded-xl py-2 text-xs font-medium transition-all ${
            mode === 'song'
              ? 'bg-[#8b7355] text-white'
              : 'bg-[#f5f1e8] text-[#8b7355] hover:bg-[#ebe4d5]'
          }`}
        >
          <Music className="inline w-4 h-4 mr-2" />
          Singing
        </button>
        <button
          type="button"
          onClick={() => setMode('follow')}
          className={`flex-1 rounded-xl py-2 text-xs font-medium transition-all ${
            mode === 'follow'
              ? 'bg-[#8b7355] text-white'
              : 'bg-[#f5f1e8] text-[#8b7355] hover:bg-[#ebe4d5]'
          }`}
        >
          <Headphones className="inline w-4 h-4 mr-2" />
          Follow-along
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 mb-8">
        <div
          ref={progressRef}
          className={`h-2 bg-[#d4c5a9]/20 rounded-full overflow-hidden cursor-pointer relative ${
            isDragging ? 'cursor-grabbing' : 'cursor-pointer'
          }`}
          onPointerDown={handleSeekPointerDown}
        >
          <div
            className="h-full bg-gradient-to-r from-[#8b7355] to-[#a89984] transition-all duration-300"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
          {/* Drag indicator */}
          <div
            className={`absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-transform ${
              isDragging ? 'bg-[#6b5745] scale-110' : 'bg-[#8b7355]'
            }`}
            style={{
              left: `${duration ? (currentTime / duration) * 100 : 0}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <div className="flex justify-center mt-2 text-xs text-[#a89984] tabular-nums">
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-full bg-[#f5f1e8] hover:bg-[#ebe4d5] text-[#8b7355] flex items-center justify-center transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-[#8b7355] hover:bg-[#6b5745] text-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
          title={isPlaying ? 'Pause' : isLoading ? 'Loading audio...' : 'Play'}
          disabled={!activeAudioUrl}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        <button
          onClick={toggleSpeed}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            playbackSpeed !== 1
              ? 'bg-[#8b7355] text-white'
              : 'bg-[#f5f1e8] hover:bg-[#ebe4d5] text-[#8b7355]'
          }`}
          title={`Speed: ${playbackSpeed}x`}
        >
          <Gauge className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsSentenceMode(prev => !prev)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isSentenceMode
              ? 'bg-[#8b7355] text-white'
              : 'bg-[#f5f1e8] hover:bg-[#ebe4d5] text-[#8b7355]'
          }`}
          title={isSentenceMode ? 'Sentence mode enabled' : 'Sentence mode disabled'}
        >
          <span className="text-sm font-medium">句</span>
        </button>

        <button
          onClick={toggleLoop}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isLooping
              ? 'bg-[#8b7355] text-white'
              : 'bg-[#f5f1e8] hover:bg-[#ebe4d5] text-[#8b7355]'
          }`}
          title={isLooping ? 'Loop enabled' : 'Loop disabled'}
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#a89984]">
        <span className={playbackSpeed !== 1 ? 'text-[#8b7355] font-medium' : ''}>
          {playbackSpeed}x Speed
        </span>
        <span>•</span>
        <span className={isSentenceMode ? 'text-[#8b7355] font-medium' : ''}>
          {isSentenceMode ? 'Sentence Mode' : 'Normal Mode'}
        </span>
        <span>•</span>
        <span className={isLooping ? 'text-[#8b7355] font-medium' : ''}>
          {isLooping ? 'Loop On' : 'Loop Off'}
        </span>
      </div>

      <p className="text-xs text-[#a89984] mt-4 text-center italic">
        {activeAudioUrl
          ? 'Tip: Click play and read along with the highlighted lines.'
          : 'No audio available for this poem yet.'}
      </p>
    </div>
  );
}
