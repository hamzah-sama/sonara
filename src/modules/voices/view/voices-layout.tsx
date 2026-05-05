import { PageHeader } from "@/components/page-header";

export const VoicesLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Explore Voices" triggerClass='lg:hidden'/>
      {children}
    </div>
  );
};
