import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { SettingPanel } from "./setting-panel";
import { SettingPanelSetting } from "./setting-panel-setting";

interface Props {
  children: React.ReactNode;
}

export const SettingDrawer = ({ children }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm">
            <Settings className="size-4" />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <SettingPanelSetting />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
