import { voiceSearchParamsCache } from "@/modules/voices/lib/params";
import { VoiceView } from "@/modules/voices/view/voice-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";
import { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Explore voices",
};

interface Props {
  searchParams: Promise<SearchParams>;
}
const Page = async ({ searchParams }: Props) => {
  const { query } = await voiceSearchParamsCache.parse(searchParams);

  await prefetch(trpc.voices.getAll.queryOptions({ query }));
  return (
    <HydrateClient>
      <VoiceView />
    </HydrateClient>
  );
};

export default Page;
