import { useClerk, useUser } from "@clerk/nextjs";
import {
  AudioLines,
  Headphones,
  Home,
  LayoutGrid,
  LucideIcon,
  Settings,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  url?: string;
  onClick?: () => void;
  allowGuest?: boolean;
}

export const useMainMenuItems = (
  setOpen: (open: boolean) => void,
): MenuItem[] => {
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  return [
    { title: "Dashboard", icon: Home, url: "/" },
    { title: "Explore Voices", icon: LayoutGrid, url: "/voices" },
    { title: "Text to speech", icon: AudioLines, url: "/text-to-speech" },
    {
      title: "Voice Cloning",
      icon: Volume2,
      onClick: () => {
        if (!isSignedIn) {
          clerk.openSignIn();
          toast.error("Please sign in to execute this action");
          return;
        }
        setOpen(true);
      },
    },
  ];
};

export const useOtherMenuItems = (): MenuItem[] => {
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  return [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => {
        if (!isSignedIn) {
          clerk.openSignIn();
          toast.error("Please sign in to execute this action");
          return;
        }
        clerk.openOrganizationProfile();
      },
    },
    {
      title: "Help and Support",
      icon: Headphones,
      allowGuest: true,
      url: "mailto:hamzah.sama@gmail.com",
    },
  ];
};
