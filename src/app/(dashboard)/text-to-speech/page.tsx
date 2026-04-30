import { TextToSpeechView } from "@/modules/text-to-speech/view/text-to-speech-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to speech",
};

interface Props {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}
const Page = async ({ searchParams }: Props) => {
  const { text, voiceId } = await searchParams;

  await prefetch(trpc.voices.getAll.queryOptions());
  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
};

export default Page;
