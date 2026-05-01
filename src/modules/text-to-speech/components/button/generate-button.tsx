import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  disabled: boolean;
  isSubmitting: boolean;
  onClick: () => void;
  size?: "sm" | "default";
  className?: string;
}
export const GenerateButton = ({
  disabled,
  isSubmitting,
  onClick,
  size,
  className,
}: Props) => {
  return (
    <Button
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-3" /> Generating...
        </>
      ) : (
        "Generate speech"
      )}
    </Button>
  );
};
