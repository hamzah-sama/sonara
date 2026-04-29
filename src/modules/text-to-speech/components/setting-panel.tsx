import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Settings } from "lucide-react";
import { SettingPanelSetting } from "./setting-panel-setting";
import { SettingPanelHistory } from "./setting-panel-history";

const tabsTriggerClassname =
  "flex-1 h-full gap-2 bg-transparent rounded-none border-x-0 border-t-0 border-b border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none";

export const SettingPanel = () => {
  return (
    <div className="w-105 hidden lg:flex min-h-0 border-l flex-col">
      <Tabs
        className="flex flex-col h-full min-h-0 gap-y-0"
        defaultValue="settings"
      >
        <TabsList>
          <TabsTrigger value="settings" className={tabsTriggerClassname}>
            <Settings className="size-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history" className={tabsTriggerClassname}>
            <History className="size-4" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="settings"
          className="flex flex-col min-h-0 flex-1 overflow-y-auto"
        >
          <SettingPanelSetting />
        </TabsContent>
        <TabsContent
          value="history"
          className="flex flex-col min-h-0 flex-1 overflow-y-auto"
        >
          <SettingPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
