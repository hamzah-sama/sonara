import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MenuItem } from "./sidebar-item";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface Props {
  label?: string;
  items: MenuItem[];
  pathName: string;
}

export const SidebarMenuGroup = ({ label, items, pathName }: Props) => {
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-muted-foreground text-[13px] uppercase">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathName === "/"
                      : pathName === item.url ||
                        pathName.startsWith(item.url + "/")
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
              >
                {item.url ? (
                  <Link
                    href={item.url}
                    onClick={(e) => {
                      if (!isSignedIn) {
                        clerk.openSignIn();
                        toast.error("Please sign in to execute this action");
                        e.preventDefault();
                        return;
                      }
                    }}
                  >
                    <item.icon />
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
