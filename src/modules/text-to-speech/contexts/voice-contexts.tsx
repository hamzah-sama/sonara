"use client";

import { VoiceType } from "@/types/voice-type";
import { createContext, useContext } from "react";

interface TTSVoiceContextValue {
  customVoices: VoiceType[];
  systemVoices: VoiceType[];
  allVoices: VoiceType[];
}

export const TTSVoiceContext = createContext<TTSVoiceContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  value: TTSVoiceContextValue;
}
export const VoiceContextProvider = ({ children, value }: Props) => {
  return (
    <TTSVoiceContext.Provider value={value}>
      {children}
    </TTSVoiceContext.Provider>
  );
};

export const useVoiceContext = () => {
  const context = useContext(TTSVoiceContext);
  if (!context) {
    throw new Error("useVoiceContext must be used within a VoiceProvider.");
  }
  return context;
};
