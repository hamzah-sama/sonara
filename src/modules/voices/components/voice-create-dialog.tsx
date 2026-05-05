import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { VoiceCreateForm } from "./voice-create-form";

export const VoiceCreateDialog = () => {
  const isMobile = useIsMobile();
  const [popoverPortalHost, setPopoverPortalHost] =
    useState<HTMLDivElement | null>(null);

  if (isMobile)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="sm">
            <Sparkles className="size-4" />
            Custom voice
          </Button>
        </DrawerTrigger>
        <DrawerContent ref={setPopoverPortalHost}>
          <DrawerHeader>
            <DrawerTitle>Create custom voice</DrawerTitle>
            <DrawerDescription>
              Upload or record an audio sample to add a new voice to your
              library.
            </DrawerDescription>
          </DrawerHeader>
          <VoiceCreateForm
            scrollable
            popoverPortalHost={popoverPortalHost}
            footer={(submit) => (
              <DrawerFooter>
                {submit}
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            )}
          />
        </DrawerContent>
      </Drawer>
    );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Sparkles className="size-4" />
          Custom voice
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={setPopoverPortalHost}
        style={{ width: "40rem", maxWidth: "calc(100% - 2rem)" }}
      >
        <DialogHeader className="text-left">
          <DialogTitle>Create custom voice</DialogTitle>
          <DialogDescription>
            Upload or record an audio sample to add a new voice to your library.
          </DialogDescription>
        </DialogHeader>
        <VoiceCreateForm popoverPortalHost={popoverPortalHost} />
      </DialogContent>
    </Dialog>
  );
};
