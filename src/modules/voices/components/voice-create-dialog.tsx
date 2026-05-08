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
import { useCallback, useState } from "react";
import { VoiceCreateForm } from "./voice-create-form";
import { useCheckout } from "@/modules/billing/hooks/use-checkout";
import { toast } from "sonner";
import { useShowCreateVoiceForm } from "@/modules/text-to-speech/contexts/show-create-voice-context";

interface Props {
  children?: React.ReactNode;
}

export const VoiceCreateDialog = ({ children }: Props) => {
  const { setOpen, open } = useShowCreateVoiceForm();

  const isMobile = useIsMobile();
  const [popoverPortalHost, setPopoverPortalHost] =
    useState<HTMLDivElement | null>(null);

  const { checkout } = useCheckout();

  const handleError = useCallback(
    (message: string) => {
      if (
        [
          "SUBSCRIPTION_REQUIRED",
          "subscription check unavailable, please try again",
        ].includes(message)
      ) {
        toast.error("Subscription required", {
          action: {
            label: "subscribe",
            onClick: () => checkout(),
          },
        });
      } else {
        toast.error(message);
      }
    },
    [checkout],
  );

  if (isMobile)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
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
            onFormClose={() => setOpen(false)}
            onError={handleError}
          />
        </DrawerContent>
      </Drawer>
    );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
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
        <VoiceCreateForm
          popoverPortalHost={popoverPortalHost}
          onFormClose={() => setOpen(false)}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
};
