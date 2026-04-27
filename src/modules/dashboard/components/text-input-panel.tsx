"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { COST_PER_CHAR, MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const TextInputPanel = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmedText)}`);
  };

  return (
    <div className="rounded-[22px] bg-linear-185 from-[#ff8ee3] from-15% via-[#57d7e0] via-39% to-[#dbf1f2] to-85% p-0.5 shadow-[0_0_0_4px_white]">
      <div className="rounded-4xl bg-[#f9f9f9] p-1 ">
        <div className="space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs">
          <Textarea
            placeholder="start typing or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-35 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
            maxLength={MAX_TEXT_INPUT_LENGTH}
          />
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-dashed gap-1.5 p-2">
              <Coins className="size-3 text-chart-5" />
              {text.trim().length === 0 ? (
                "Start typing to estimate"
              ) : (
                <span className="tabular-nums">
                  ${(text.length * COST_PER_CHAR).toFixed(4)} estimated
                </span>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {text.length.toLocaleString('en-US')} /{" "}
              {MAX_TEXT_INPUT_LENGTH.toLocaleString('en-US')} characters
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center p-3">
        <Button
          size="sm"
          onClick={handleGenerate}
          disabled={!text.trim()}
          className="w-full lg:w-auto"
        >
          Generate speech
        </Button>
      </div>
    </div>
  );
};
