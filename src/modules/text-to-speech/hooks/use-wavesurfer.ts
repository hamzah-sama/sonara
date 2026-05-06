import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { set } from "zod";

export const useWaveSurfer = (audioUrl: string) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const isMobile = useIsMobile();

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (!containerRef.current || !audioUrl) return;

    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }

    let destroyed = false;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#a8a8b3",
      progressColor: "#3b82f6",
      cursorColor: "#3b82f6",
      cursorWidth: 2,
      barWidth: 2,
      barRadius: 2,
      barGap: 2,
      barMinHeight: 2,
      height: "auto",
      normalize: true,
    });

    waveSurferRef.current = ws;

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());
      ws.play().catch(() => {});
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));
    ws.on("timeupdate", (time) => setCurrentTime(time));

    ws.on("error", (error) => {
      if (destroyed) return;
      console.error("wavesurfer error", error);
    });

    ws.load(audioUrl).catch((error) => {
      if (destroyed) return;
      console.error("wavesurfer load error", error);
    });

    return () => {
      destroyed = true;
      ws.destroy();
    };
  }, [audioUrl, isMobile]);

  const togglePlayPause = useCallback(() => {
    waveSurferRef.current?.playPause();
  }, []);

  const seekForward = useCallback((seconds: number) => {
    const ws = waveSurferRef.current;
    if (!ws) return;
    const duration = ws.getDuration();
    const newTime = Math.min(duration, ws.getCurrentTime() + seconds);
    ws.seekTo(newTime / duration);
  }, []);

  const seekBackward = useCallback((seconds: number) => {
    const ws = waveSurferRef.current;
    if (!ws) return;
    const duration = ws.getDuration();
    if(duration === 0) return;
    const newTime = Math.max(0, ws.getCurrentTime() - seconds);
    ws.seekTo(newTime / duration);
  }, []);

  return {
    containerRef,
    isReady,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seekForward,
    seekBackward,
  };
};
