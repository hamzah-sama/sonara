import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { AlignLeft, Layers, Mic, Tag, Upload } from "lucide-react";
import {
  VOICE_CATEGORY_LABELS,
  voiceCategories,
} from "../../data/voice-categories";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { LanguageField } from "./language-field";
import { UploadCard } from "./upload-card";
import { voiceCreateSchema } from "./voice-create-schema";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AudioRecord } from "./audio-record";

interface Props {
  scrollable?: boolean;
  footer?: (submit: ReactNode) => React.ReactNode;
  /** Port popovers here so nested menus scroll inside modal drawers/dialogs (scroll-lock). */
  popoverPortalHost?: HTMLElement | null;
  onError?: (message: string) => void;
}

interface VoiceMutation {
  name: string;
  description?: string;
  category: string;
  file: File;
  language: string;
}

export const VoiceCreateForm = ({
  scrollable,
  footer,
  popoverPortalHost,
  onError,
}: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async ({
      name,
      description,
      category,
      file,
      language,
    }: VoiceMutation) => {
      const params = new URLSearchParams({
        name,
        category,
        language,
      });

      if (description) {
        params.set("description", description);
      }

      const response = await fetch(`/api/voices/create?${params.toString()}`, {
        method: "POST",
        headers: { "content-type": file.type },
        body: file,
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Failed to create voice");
      }

      return response.json();
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      file: null as File | null,
      category: "GENERAL" as string,
      language: "en-US",
      description: "",
    },
    validators: {
      onSubmit: voiceCreateSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createMutation.mutateAsync({
          name: value.name,
          description: value.description,
          language: value.description,
          file: value.file!,
          category: value.category,
        });

        toast.success("voices created succesfully");
        queryClient.invalidateQueries(trpc.voices.getAll.queryOptions());

        form.reset();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to created voice";
        if (onError) {
          onError(message);
        }
        toast.error(message);
      }
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col", scrollable ? "min-h-0 flex-1" : "gap-6")}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          scrollable && "no-scrollbar px-4 overflow-y-auto",
        )}
      >
        <form.Field name="file">
          {(field) => {
            const isInValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInValid}>
                <Tabs defaultValue="upload">
                  <TabsList className="h-11 w-full">
                    <TabsTrigger value="upload">
                      <Upload className="size-4" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="record">
                      <Mic className="size-4" />
                      Record
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload">
                    <UploadCard
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInValid}
                    />
                  </TabsContent>
                  <TabsContent value="record">
                    <AudioRecord
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInValid}
                    />
                  </TabsContent>
                </Tabs>
                {isInValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="name">
          {(field) => {
            const isInValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInValid}>
                <div className="relative flex items-center">
                  <div className="absolute left-0 pointer-events-none flex items-center justify-center h-full w-11">
                    <Tag className="text-muted-foreground size-4" />
                  </div>
                  <Input
                    id={field.name}
                    placeholder="voice name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    style={{ paddingLeft: "40px" }}
                  />
                </div>
                {isInValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="category">
          {(field) => {
            const isInValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInValid}>
                <div className="relative flex items-center">
                  <div className="absolute left-0 pointer-events-none flex items-center justify-center h-full w-11">
                    <Layers className="text-muted-foreground size-4" />
                  </div>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger
                      className="w-full"
                      style={{ paddingLeft: "40px" }}
                    >
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {voiceCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {VOICE_CATEGORY_LABELS[category]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {isInValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="language">
          {(field) => {
            const isInValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInValid}>
                <LanguageField
                  popoverPortalHost={popoverPortalHost}
                  value={
                    typeof field.state.value === "string"
                      ? field.state.value
                      : undefined
                  }
                  onChange={(v) => field.handleChange(v)}
                />
                {isInValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="description">
          {(field) => {
            const isInValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInValid}>
                <div className="relative flex items-center">
                  <div className="absolute left-0 pointer-events-none flex top-3 justify-center h-full w-11">
                    <AlignLeft className="text-muted-foreground size-4" />
                  </div>
                  <Textarea
                    id={field.name}
                    placeholder="Describe this voice..."
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    className="resize-none rounded-md border w-full"
                    style={{ paddingLeft: "40px", minHeight: "100px" }}
                  />
                </div>
                {isInValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Subscribe>
          {({ isSubmitting }) => {
            const submitButton = (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create voice"}
              </Button>
            );

            return footer ? footer(submitButton) : submitButton;
          }}
        </form.Subscribe>
      </div>
    </form>
  );
};
