"use client";

import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext } from "react";

type TTSVoicesItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["customVoices"][number];

interface TTSVoiceContextValue {
  customVoices: TTSVoicesItem[];
  systemVoices: TTSVoicesItem[];
  allVoices: TTSVoicesItem[];
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
