import { quickActions } from "@/constants";
import { QuickActionsCard } from "./quick-actions-card";

export const QuickActionPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick actions</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {quickActions.map((item) => (
          <QuickActionsCard
            key={item.href}
            title={item.title}
            description={item.description}
            gradient={item.gradient}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};
