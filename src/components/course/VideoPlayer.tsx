import React, { useEffect, useRef, useState, useCallback } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle, Settings, SkipForward, SkipBack } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  onProgress: (percentage: number) => void;
  isCompleted: boolean;
  currentProgress: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  youtubeId,
  title,
  onProgress,
  isCompleted,
  currentProgress
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackingInterval = useRef<NodeJS.Timeout | null>(null);

  const onReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    event.target.setVolume(volume);
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressTracking();
    } else {
      setIsPlaying(false);
      stopProgressTracking();
    }

    if (event.data === YouTube.PlayerState.ENDED) {
      onProgress(100);
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const startProgressTracking = () => {
    if (trackingInterval.current) clearInterval(trackingInterval.current);
    trackingInterval.current = setInterval(() => {
      if (player) {
        const curr = player.getCurrentTime();
        const dur = player.getDuration();
        setCurrentTime(curr);
        setDuration(dur);

        if (dur > 0) {
          const percent = (curr / dur) * 100;
          if (percent > currentProgress) {
            onProgress(percent);
          }
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (trackingInterval.current) {
      clearInterval(trackingInterval.current);
    }
  };

  useEffect(() => {
    return () => stopProgressTracking();
  }, []);

  const togglePlay = useCallback(() => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [player, isPlaying]);

  const handleSeek = (value: number[]) => {
    if (!player) return;
    const newTime = (value[0] / 100) * duration;
    player.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const skip = useCallback((seconds: number) => {
    if (!player) return;
    const newTime = Math.min(Math.max(currentTime + seconds, 0), duration);
    player.seekTo(newTime);
    setCurrentTime(newTime);
  }, [player, currentTime, duration]);

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      player.setVolume(volume);
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (!player) return;
    const newVol = value[0];
    setVolume(newVol);
    player.setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      player.unMute();
      setIsMuted(false);
    }
  };

  const changeSpeed = (rate: number) => {
    if (!player) return;
    player.setPlaybackRate(rate);
    setPlaybackRate(rate);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if no input is focused to avoid conflicts
      if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
        case 'k':
          e.preventDefault(); // Prevent scrolling
          togglePlay();
          break;
        case 'ArrowLeft':
        case 'j':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
        case 'l':
          e.preventDefault();
          skip(10);
          break;
        case 'f':
          toggleFullScreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, skip]); // Dependencies must be stable or included in useCallback

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0, // CRITICAL: Hides default YT controls
      disablekb: 1,
      fs: 0,
      modestbranding: 1, // Hides YT logo in control bar
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
    },
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-serif font-bold text-xl tracking-wide">{title}</h3>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl group ring-1 ring-white/10"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        onClick={togglePlay} // Clicking video toggles play
      >
        <div className="absolute inset-0 pointer-events-none">
          {/* No Scaling - Fit Content */}
          <YouTube
            videoId={youtubeId}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            className="w-full h-full"
            iframeClassName="w-full h-full object-contain"
          />
        </div>

        {/* Overlay Controls & Mask */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end transition-opacity duration-300 z-20",
            showControls || !isPlaying
              ? "opacity-100" // Removed background blur/dimming
              : "opacity-0 cursor-none"
          )}
          onClick={(e) => e.stopPropagation()} // Prevent double toggle on control clicks
        >
          {/* Big Center Play Button (Only when paused) */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="pointer-events-auto h-20 w-20 bg-blue-600/90 text-white rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm cursor-pointer"
                  onClick={togglePlay}
                >
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Bar */}
          <div className="px-6 pb-6 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent space-y-3 pointer-events-auto select-none">
            {/* Progress Slider */}
            <div className="group/slider relative h-4 flex items-center" onClick={(e) => e.stopPropagation()}>
              <Slider
                value={[progressPercent]}
                max={100}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-white/90" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-blue-400 transition-colors focus:outline-none">
                  {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={() => skip(-10)} className="hover:text-blue-400 transition-colors p-1"><SkipBack className="w-5 h-5" /></button>
                  <button onClick={() => skip(10)} className="hover:text-blue-400 transition-colors p-1"><SkipForward className="w-5 h-5" /></button>
                </div>

                <div className="flex items-center gap-2 group/vol">
                  <button onClick={toggleMute} className="hover:text-blue-400 transition-colors">
                    {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300 ease-in-out">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      onValueChange={handleVolumeChange}
                      className="w-20"
                    />
                  </div>
                </div>

                <span className="text-xs font-mono opacity-80 pt-0.5">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn("hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10", playbackRate !== 1 && "text-blue-400")}>
                      <Settings className="w-5 h-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 bg-black/90 border-white/20 text-white backdrop-blur-xl" side="top">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">Speed</p>
                      {[0.5, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => changeSpeed(rate)}
                          className={cn(
                            "w-full text-left px-2 py-1.5 text-sm rounded hover:bg-white/20 transition-colors flex justify-between",
                            playbackRate === rate && "text-primary font-bold"
                          )}
                        >
                          {rate}x
                          {playbackRate === rate && <CheckCircle className="w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="h-4 w-px bg-white/20 mx-1" />

                <button onClick={toggleFullScreen} className="hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10">
                  <Maximize className="w-5 h-5" />
                </button>

                {/* Branding to cover YouTube Logo */}
                {/* Branding to cover YouTube Logo */}
                <div className="bg-blue-950 px-4 pl-10 py-2 rounded-tl-lg ml-4 z-50 translate-y-6 translate-x-6 flex items-center gap-2 shadow-2xl">
                  <img
                    src="https://i.postimg.cc/zXtGS9R4/cisco-logo.jpg"
                    alt="Cisco"
                    className="h-6 object-contain mix-blend-multiply brightness-150 contrast-125"
                  />
                  <span className="font-black text-xl tracking-tighter text-white select-none">
                    CCNA
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
