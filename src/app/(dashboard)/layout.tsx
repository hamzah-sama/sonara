import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";
import { cookies } from "next/headers";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="h-svh"
      key={Math.random()}
    >
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main className="flex flex-1 min-h-0 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
