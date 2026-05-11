import { Badge } from "@/components/ui/badge";
import { COST_PER_CHAR, MAX_TEXT_INPUT_LENGTH } from "@/constants";
import { Coins } from "lucide-react";

interface Props {
  text: string;
  children: React.ReactNode;
}
export const TextInputStats = ({ text, children : generateButton }: Props) => {
  return (
    <div className="lg:flex hidden items-center justify-between">
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
      <div className="flex items-center gap-3">
        <p className="tracking-tight text-xs">
          {text.length.toLocaleString("en-US")}
          <span className="text-xs text-muted-foreground">
            &nbsp;/&nbsp; {MAX_TEXT_INPUT_LENGTH.toLocaleString("en-US")}{" "}
            characters
          </span>
        </p>
        {generateButton}
      </div>
    </div>
  );
};
