import { PageHeader } from "@/components/page-header";

export const TextToSpeechLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Text to speech" triggerClass='lg:hidden'/>
      {children}
    </div>
  );
};
