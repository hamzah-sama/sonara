"use client";

import { useCallback, useEffect, useRef, useState } from "react";

let activeAudio: HTMLAudioElement | null = null;

export const useAudioPlayback = (src: string | File | null) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const endedHandlerRef = useRef<(() => void) | null>(null);
  const pauseHandlerRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const stopPlayback = useCallback(() => {
    const currentAudio = audioRef.current;

    if (!currentAudio) return;

    currentAudio.pause();
    currentAudio.currentTime = 0;
    setIsPlaying(false);
    setIsloading(false);

    if (activeAudio === currentAudio) {
      activeAudio = null;
    }
  }, []);

  const cleanupAudio = useCallback(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      currentAudio.pause();

      if (endedHandlerRef.current) {
        currentAudio.removeEventListener("ended", endedHandlerRef.current);
      }

      if (pauseHandlerRef.current) {
        currentAudio.removeEventListener("pause", pauseHandlerRef.current);
      }

      currentAudio.removeAttribute("src");
      audioRef.current = null;
    }

    if (activeAudio === currentAudio) {
      activeAudio = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    endedHandlerRef.current = null;
    pauseHandlerRef.current = null;
    setIsPlaying(false);
    setIsloading(false);
  }, []);

  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio, src]);

  const togglePlayPause = useCallback(() => {
    if (!src) return;

    if (!audioRef.current) {
      const url =
        src instanceof File
          ? (objectUrlRef.current = URL.createObjectURL(src))
          : src;

      audioRef.current = new Audio(url);
      endedHandlerRef.current = () => {
        setIsPlaying(false);
        setIsloading(false);

        if (activeAudio === audioRef.current) {
          activeAudio = null;
        }
      };
      pauseHandlerRef.current = () => {
        setIsPlaying(false);
      };
      audioRef.current.addEventListener("ended", endedHandlerRef.current);
      audioRef.current.addEventListener("pause", pauseHandlerRef.current);
    }

    if (isPlaying) {
      stopPlayback();
    } else {
      if (activeAudio && activeAudio !== audioRef.current) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      }

      activeAudio = audioRef.current;
      setIsloading(true);
      void audioRef.current
        ?.play()
        .then(() => {
          setIsPlaying(true);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, [src, isPlaying, stopPlayback]);

  return { isPlaying, isLoading, togglePlayPause };
};
