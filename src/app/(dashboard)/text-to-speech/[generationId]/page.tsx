import { TextToSpeechViewDetail } from "@/modules/text-to-speech/view/text-to-speech-view-detail";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ generationId: string }>;
}

const Page = async ({ params }: Props) => {
  const { generationId } = await params;
  await prefetch(trpc.generations.getById.queryOptions({ id: generationId }));
  await prefetch(trpc.voices.getAll.queryOptions());
  return (
    <HydrateClient>
      <TextToSpeechViewDetail generationId={generationId} />
    </HydrateClient>
  );
};

export default Page;
