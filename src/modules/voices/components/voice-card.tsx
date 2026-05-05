"use client";

import { VoiceType } from "@/types/voice-type";
import { parseLanguage } from "../lib/parse-language";
import { VoiceAvatar } from "@/components/avatar/voice-avatar";
import { VOICE_CATEGORY_LABELS } from "../data/voice-categories";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Mic, MoreHorizontal, Pause, Play, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/delete-dialog";

interface Props {
  voice: VoiceType;
}

export const VoiceCard = ({ voice }: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { countryCode, region } = parseLanguage(voice.language);
  const audioSrc = `/api/voices/${encodeURIComponent(voice.id)}`;
  const { isPlaying, isLoading, togglePlayPause } = useAudioPlayback(audioSrc);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deleteVoice = useMutation(
    trpc.voices.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.voices.getAll.queryKey(),
        });
        setShowDeleteDialog(false);
        toast.success("Voice deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to deleted voice");
      },
    }),
  );

  return (
    <div className="flex items-center gap-1 border overflow-hidden pr-3 lg:pr-6 rounded-xl">
      <div className="relative h-24 w-20 lg:h-30 lg:w-24 shrink-0">
        <div className="absolute left-0 top-0 h-24 w-10 lg:h-30 lg:w-12 border-r bg-muted/50 " />
        <div className="flex items-center justify-center absolute inset-0">
          <VoiceAvatar
            seed={voice.id}
            name={voice.name}
            className="border-[1.5px] lg:size-18 size-14 border-white shadow-xs "
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-1.5 lg:gap-3 min-w-0 ">
        <div className="flex items-center text-sm font-medium line-clamp-1 tracking-tight">
          {voice.name}
          <span className="bg-muted-foreground/50 size-1 rounded-full shrink-0" />
          <div className="text-[#327c88]">
            {VOICE_CATEGORY_LABELS[voice.category]}
          </div>
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {voice.description}
        </p>
        <p className="flex items-center gap-1 text-xs">
          {countryCode ? (
            <Image
              src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
              alt=""
              width={20}
              height={15}
              className="shrink-0 h-3.5 w-[calc(0.875rem*4/3)] rounded-[2px] object-cover shadow-xs"
              loading="lazy"
            />
          ) : null}
          <span className="font-medium truncate">{region}</span>
        </p>
      </div>

      <div className="flex items-center gap-1 lg:gap-2 ml-1 lg:ml-3">
        <Button
          variant="outline"
          size="icon-sm"
          disabled={isLoading}
          onClick={togglePlayPause}
        >
          {isLoading ? (
            <Spinner className="size-4" />
          ) : isPlaying ? (
            <Pause className="size-4 " />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-sm" className="rounded-full">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem asChild>
              <Link href={`/text-to-speech?voiceId=${voice.id}}`}>
                <Mic className="size-4 text-foreground" />
                <span className="text-muted-foreground">Use this voice</span>
              </Link>
            </DropdownMenuItem>
            {voice.variant === "CUSTOM" && (
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive"
              >
                <TrashIcon className="size-4" />
                <span className="font-medium">Delete voice</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {voice.variant === "CUSTOM" && (
          <DeleteDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onClick={(e) => {
              e.preventDefault();
              deleteVoice.mutate({ id: voice.id });
            }}
            isPending={deleteVoice.isPending}
            voiceName={voice.name}
          />
        )}
      </div>
    </div>
  );
};
