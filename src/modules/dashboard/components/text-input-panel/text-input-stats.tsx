import { Badge } from "@/components/ui/badge";
import { COST_PER_CHAR, MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { Coins } from "lucide-react";

interface Props {
  text: string;
}
export const TextInputStats = ({ text }: Props) => {
  return (
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
        {text.length.toLocaleString("en-US")} /{" "}
        {MAX_TEXT_INPUT_LENGTH.toLocaleString("en-US")} characters
      </span>
    </div>
  );
};
