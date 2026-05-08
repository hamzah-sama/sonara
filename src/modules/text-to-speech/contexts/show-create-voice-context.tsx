"use client";
import { createContext, useContext, useState } from "react";

type ShowCreateVoiceContexttype = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ShowCreateVoiceContext = createContext<ShowCreateVoiceContexttype | null>(
  null,
);

interface Props {
  children: React.ReactNode;
}

export const ShowCreateVoiceContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <ShowCreateVoiceContext.Provider value={{ open, setOpen }}>
      {children}
    </ShowCreateVoiceContext.Provider>
  );
};

export const useShowCreateVoiceForm = () => {
  const context = useContext(ShowCreateVoiceContext);
  if (!context)
    throw new Error("useShowCreateVoiceForm must be used within a providerr.");
  return context;
};
