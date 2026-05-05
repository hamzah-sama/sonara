import { VoiceCategory } from "@/generated/prisma/enums";
import { voiceCategories } from "@/modules/voices/data/voice-categories";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { parseBuffer } from "music-metadata";
import { prisma } from "@/lib/db";
import { uploadAudio } from "@/lib/r2";

const createVoiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(voiceCategories as [VoiceCategory, ...VoiceCategory[]]),
  language: z.string().min(1, "Language is required"),
  description: z.string().nullable(),
});

const MAX_UPLOAD_SIZE = 20 * 1024 * 1024; // 20MB
const MIN_AUDIO_DURATION_SECONDS = 10;

export async function POST(req: Request) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);

  const validateData = createVoiceSchema.safeParse({
    name: url.searchParams.get("name"),
    category: url.searchParams.get("category") as VoiceCategory,
    language: url.searchParams.get("language"),
    description: url.searchParams.get("description"),
  });

  if (!validateData.success) {
    return Response.json(
      {
        error: "invalid input",
        issues: validateData.error.issues,
      },
      { status: 400 },
    );
  }

  const { name, category, language, description } = validateData.data;

  const fileBuffer = await req.arrayBuffer();

  if (!fileBuffer.byteLength) {
    return Response.json(
      {
        error: "please upload an audio file",
      },
      { status: 400 },
    );
  }

  if (fileBuffer.byteLength > MAX_UPLOAD_SIZE) {
    return Response.json(
      {
        error: "audio file exceeds maximum size of 20MB",
      },
      { status: 400 },
    );
  }

  const contentType = req.headers.get("content-type");

  if (!contentType) {
    return Response.json(
      {
        error: "missing content-type header",
      },
      { status: 400 },
    );
  }

  const normalizedContentType = contentType.split(";")[0].trim() || "audio/wav";

  let duration: number;

  try {
    const metaData = await parseBuffer(
      new Uint8Array(fileBuffer),
      {
        mimeType: normalizedContentType,
      },
      {
        duration: true,
      },
    );

    duration = metaData.format.duration || 0;
  } catch (error) {
    return Response.json(
      {
        error: "file is not a valid audio file",
      },
      {
        status: 422,
      },
    );
  }

  if (duration < MIN_AUDIO_DURATION_SECONDS) {
    return Response.json(
      {
        error: `Audio too short (${duration.toFixed(1)}s), Audio duration should be at least ${MIN_AUDIO_DURATION_SECONDS} seconds`,
      },
      { status: 400 },
    );
  }

  let createdVoiceId: string | null = null;
  try {
    const voice = await prisma.voice.create({
      data: {
        name,
        category,
        language,
        description,
        orgId,
        variant: "CUSTOM",
      },
      select: {
        id: true,
      },
    });
    createdVoiceId = voice.id;

    const r2ObjectKey = `voices/orgs/${orgId}/${createdVoiceId}`;

    await uploadAudio({
      buffer: Buffer.from(fileBuffer),
      key: r2ObjectKey,
      contentType: normalizedContentType,
    });

    await prisma.voice.update({
      where: {
        id: createdVoiceId,
      },
      data: {
        r2ObjectKey,
      },
    });
  } catch (error) {
    if (createdVoiceId) {
      await prisma.voice
        .delete({
          where: {
            id: createdVoiceId,
          },
        })
        .catch(() => {});
    }
    return Response.json(
      {
        error: "Failed to create voice, please retry",
      },
      {
        status: 500,
      },
    );
  }

  return Response.json(
    {
      name,
      message: "Voice created successfully",
    },
    {
      status: 200,
    },
  );
}
