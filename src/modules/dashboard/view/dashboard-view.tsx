import { PageHeader } from "@/components/page-header";
import { HeroPattern } from "../components/hero-pattern";
import { DashboardHeader } from "../components/dashboard-header";
import { TextInputPanel } from "../components/text-input-panel";
import { QuickActionPanel } from "../components/quick-action-panel";

export const DashboardView = () => {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative p-4 lg:p-8 space-y-8">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionPanel />
      </div>
    </div>
  );
};
