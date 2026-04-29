"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { sliders } from "@/constants";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@tanstack/react-form";
import { VoiceSelector } from "./voice-selector";

export const SettingPanelSetting = () => {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <>
      <div className="border border-dashed border-border">
        <VoiceSelector />
      </div>
      <div className="p-4 flex-1">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {slider.leftLabel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {slider.rightLabel}
                    </span>
                  </div>

                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                  />
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
};
