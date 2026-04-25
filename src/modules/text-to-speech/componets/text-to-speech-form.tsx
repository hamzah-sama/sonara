import { useAppForm } from "@/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const ttsFormSchema = z.object({
  text: z.string().min(1, "Text is required"),
  voiceId: z.string().min(1, "Voice is required"),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;

export const defaultTTSValues: TTSFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});

interface Props {
  defaultValues?: TTSFormValues;
  children: React.ReactNode;
}

export const TextToSpeechForm = ({ defaultValues, children }: Props) => {
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        toast.success("Generating audio...");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to  generate audio";
        toast.error(message);
      }
    },
  });
  return <form.AppForm>{children}</form.AppForm>;
};
