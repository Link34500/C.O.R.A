"use client";

import { Source } from "@/generated/prisma/client";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  record: any;
  source: Source;
}

export default function AudioPlayer({ record, source }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-base-100 border border-base-300 rounded-lg p-4">
      <audio ref={audioRef} src={record.url} preload="metadata" />
      
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={togglePlayPause}
          className="btn btn-primary btn-sm btn-circle"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        
        <div className="flex items-center gap-2 flex-1">
          <Volume2 className="w-4 h-4 text-base-content/60" />
          <span className="text-sm text-base-content/60">#{record.id}</span>
        </div>
        
        <span className="text-sm text-base-content/60">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, currentColor ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`
        }}
      />
    </div>
  );
}
