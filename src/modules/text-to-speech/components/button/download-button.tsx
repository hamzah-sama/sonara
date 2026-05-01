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
    try {
      const parsedUrl = new URL(audioUrl, window.location.origin);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid URL protocol");
      }
      const link = document.createElement("a");
      link.href = parsedUrl.toString();
      link.download = `${safeName}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Audio downloaded successfully");
    } catch {
      toast.error("unable to download audio");
    } finally {
      setIsDownloading(false);
    }
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
