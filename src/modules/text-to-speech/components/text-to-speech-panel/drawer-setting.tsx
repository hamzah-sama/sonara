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

interface Props {
  children: React.ReactNode;
}

export const Drawersetting = ({ children }: Props) => {
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
          <SettingPanel />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
