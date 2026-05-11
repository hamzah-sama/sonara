import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, useClerk } from "@clerk/nextjs";

export const AuthOrg = () => {
  const { isSignedIn } = useClerk();
  if (!isSignedIn) return null;
  return (
    <OrganizationSwitcher
      hidePersonal
      fallback={
        <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-white" />
      }
      appearance={{
        elements: {
          rootBox:
            "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
          organizationSwitcherTrigger:
            "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]!",
          organizationPreview: "gap-2!",
          organizationPreviewAvatarBox: "size-6! rounded-sm!",
          organizationPreviewTextContainer:
            "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
          organizationPreviewMainIdentifier: "text-[13px]!",
          organizationSwitcherTriggerIcon:
            "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
        },
      }}
    />
  );
};
