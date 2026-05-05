import { prisma } from "@/lib/db";
import { getAudio } from "@/lib/r2";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ voiceId: string }> },
) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { voiceId } = await params;

  const voice = await prisma.voice.findUnique({
    where: {
      id: voiceId,
    },
    select: {
      variant: true,
      orgId: true,
      r2ObjectKey: true,
    },
  });

  if (!voice) {
    return new Response("Voice not found", { status: 404 });
  }

  if (voice.variant === "CUSTOM" && voice.orgId !== orgId) {
    return new Response("Voice not found", { status: 404 });
  }

  if (!voice.r2ObjectKey) {
    return new Response("Audio not available", { status: 404 });
  }
  let audioResponse: Response;

  const signedUrl = await getAudio(voice.r2ObjectKey);

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

  const contentType = audioResponse.headers.get("content-type") || "audio/wav";

  return new Response(audioResponse.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-control":
        voice.variant === "SYSTEM"
          ? "public, max-age=86400"
          : "private, max-age=3600",
    },
  });
}
