import { SignUp } from "@clerk/nextjs";

export default function Page() {
<<<<<<< HEAD
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignUp
        appearance={{
          Element: {
            card: "shadow-lg",
            rootBox: "mx-auto",
          },
        }}
      />
    </div>
  );
=======
  return <SignUp />;
>>>>>>> 08a485ace8bc8e3c7a5405ece324d829356cacf1
}
