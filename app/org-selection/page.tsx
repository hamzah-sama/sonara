import { OrganizationList } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        appearance={{
          Element: {
            card: "shadow-lg",
            rootBox: "mx-auto",
          },
        }}
      />
    </div>
  );
};

export default Page;
