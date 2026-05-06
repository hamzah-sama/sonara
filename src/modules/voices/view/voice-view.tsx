"use client";

import { useTRPC } from "@/trpc/client";
import { VoiceList } from "../components/voice-list";
import { useQueryState } from "nuqs";
import { voiceSearchParams } from "../lib/params";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VoiceToolbar } from "../components/voice-toolbar";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const VoiceContent = () => {
  const trpc = useTRPC();
  const [query] = useQueryState("query", voiceSearchParams.query);

  const { data: voices } = useSuspenseQuery(
    trpc.voices.getAll.queryOptions({ query }),
  );

  return (
    <>
      <VoiceList title="Team voices" voices={voices.customVoices} />
      <VoiceList title="System voices" voices={voices.systemVoices} />
    </>
  );
};

export const VoiceView = () => {
  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoiceToolbar />
      <Suspense fallback={<Spinner className="size-4"/>}>
        <VoiceContent />;
      </Suspense>
    </div>
  );
};
