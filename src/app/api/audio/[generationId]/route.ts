import { prisma } from "@/lib/db";
import { getAudio } from "@/lib/r2";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ generationId: string }> },
) {
  const { userId, orgId } = await auth();
  const { generationId } = await params;

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const generation = await prisma.generation.findUnique({
    where: {
      id: generationId,
      orgId,
    },
  });

  if (!generation) {
    return new Response("Generation not found", { status: 404 });
  }

  if (!generation.r2ObjectKey) {
    return new Response("Audio not available", { status: 404 });
  }

  const signedUrl = await getAudio(generation.r2ObjectKey);

  let audioResponse: Response;

  try {
    audioResponse = await fetch(signedUrl, {
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    return new Response("provider timeout", { status: 504 });
  }

  if (!audioResponse.ok) {
    return new Response("failed to fetch", { status: 402 });
  }

  return new Response(audioResponse.body, {
    headers: {
      "Content-Type": "audio/wav",
      "Cache-control": "private, max-age=3600",
    },
  });
}
