import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  text: string;
  audioUrl: string;
  variant?: "ghost" | "outline";
  size?: "icon" | "sm";
}

export const DownloadButton = ({
  text,
  audioUrl,
  size = "sm",
  variant = "outline",
}: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = () => {
    setIsDownloading(true);
    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1000);
    toast.success("Audio downloaded successfully");
  };

  return (
    <Button
      onClick={handleDownload}
      type="button"
      variant={variant}
      size={size}
      disabled={isDownloading}
    >
      <Download className="size-4" />
    </Button>
  );
};
