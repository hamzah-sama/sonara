"use client";

import { Textarea } from "@/components/ui/textarea";
import { MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { useState } from "react";
import { GenerateButton } from "./generate-button";
import { TextInputStats } from "./text-input-stats";

export const TextInputPanel = () => {
  const [text, setText] = useState("");
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
          <TextInputStats text={text} />
        </div>
      </div>

      <div className="flex justify-end items-center p-3">
        <GenerateButton text={text} />
      </div>
    </div>
  );
};
