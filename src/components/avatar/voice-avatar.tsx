import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCreateAvatar } from "./use-create-avatar";

interface Props {
  seed: string;
  name: string;
  className?: string;
}
export const VoiceAvatar = ({ seed, name, className }: Props) => {
  const avatarUri = useCreateAvatar(seed);
  return (
    <Avatar className={cn("border-white, shadow-xs , size-4 ", className)}>
      <AvatarImage alt={name} src={avatarUri} />
      <AvatarFallback className="text-[8px]">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
