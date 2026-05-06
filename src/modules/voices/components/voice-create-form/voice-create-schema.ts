import z from "zod";

export const voiceCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  description: z.string(),
  language: z.string().min(1, "Language is required"),
  category: z.string().min(1, "Category is required"),
  file: z
    .instanceof(File, { message: "An audio File is required" })
    .nullable()
    .refine((file) => file !== null, "An audio File is required"),
});
