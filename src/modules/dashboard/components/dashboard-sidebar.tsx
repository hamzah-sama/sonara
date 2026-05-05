"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  AudioLines,
  Headphones,
  Home,
  LayoutGrid,
  LucideIcon,
  Settings,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  icon: LucideIcon;
  url?: string;
  onClick?: () => void;
}

interface Props {
  label?: string;
  items: MenuItem[];
  pathName: string;
}

export const Section = ({ label, items, pathName }: Props) => {
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
                  <Link href={item.url}>
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

export const DashboardSidebar = () => {
  const pathName = usePathname();

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/",
    },
    {
      title: "Explore Voices",
      icon: LayoutGrid,
      url: "/voices",
    },
    {
      title: "Text to speech",
      icon: AudioLines,
      url: "/text-to-speech",
    },
    {
      title: "Voice Cloning",
      icon: Volume2,
    },
  ];

  const otherMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => {},
    },
    {
      title: "Help and Support",
      icon: Headphones,
      url: "mailto:hamzah.sama@gmail.com",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 pt-4">
        <div className="flex items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
          <Image
            src="/logo-only.png"
            alt="logo"
            width={32}
            height={32}
            className="group-data-[collapsible=icon]:block hidden"
          />
          <Image
            src="/logo-text.png"
            alt="logo"
            width={72}
            height={72}
            className="group-data-[collapsible=icon]:hidden"
          />
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className=" border-b border-dashed border-border" />
      <SidebarContent>
        <Section items={mainMenuItems} pathName={pathName} />
        <Section label="others" items={otherMenuItems} pathName={pathName} />
      </SidebarContent>
      <div className=" border-b border-dashed border-border" />
      <SidebarFooter className="gap-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem className="pb-2">
            <UserButton
              showName
              fallback={
                <Skeleton className="h-8.5 w-full bg-white group-data-[collapsible=icon]:size-8 rounded-md border border-border " />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  userButtonTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier:
                    "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
