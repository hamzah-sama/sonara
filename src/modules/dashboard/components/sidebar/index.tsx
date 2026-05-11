"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UsageContainer } from "@/modules/billing/components/usage-container";
import { useShowCreateVoiceForm } from "@/modules/text-to-speech/contexts/show-create-voice-context";
import { VoiceCreateDialog } from "@/modules/voices/components/voice-create-dialog";
import { usePathname } from "next/navigation";
import { createMainMenuItems, createOtherMenuItems } from "./sidebar-item";
import { SidebarLogo } from "./sidebar-logo";
import { AuthOrg } from "../auth/auth-org";
import { SidebarMenuGroup } from "./sidebar-menu-group";
import { AuthButton } from "../auth/auth-button";
import Link from "next/link";

export const DashboardSidebar = () => {
  const pathName = usePathname();
  const { setOpen } = useShowCreateVoiceForm();

  const mainMenuItems = createMainMenuItems(setOpen);
  const otherMenuItems = createOtherMenuItems();
  return (
    <>
      <VoiceCreateDialog />
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-col gap-4 pt-4">
          <div className="flex items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
            <SidebarLogo />
            <SidebarTrigger className="ml-auto md:hidden" />
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <AuthOrg />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <div className=" border-b border-dashed border-border" />
        <SidebarContent>
          <SidebarMenuGroup items={mainMenuItems} pathName={pathName} />
          <SidebarMenuGroup
            label="others"
            items={otherMenuItems}
            pathName={pathName}
          />
        </SidebarContent>
        <div className=" border-b border-dashed border-border" />
        <SidebarFooter className="gap-3 py-3">
          <UsageContainer />
          <SidebarMenu>
            <SidebarMenuItem className="pb-2">
              <AuthButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
};
