import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background min-h-screen">
      <div className="text-2xl font-semibold">Welcome to Sonara</div>
      <div className="flex items-center gap-2">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </div>
  );
};

export default Page;
