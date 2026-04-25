import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignIn
        appearance={{
          Element: {
            card: "shadow-lg",
            rootBox: "mx-auto",
          },
        }}
      />
    </div>
  );
}
