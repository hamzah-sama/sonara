<<<<<<< HEAD
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
=======
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
>>>>>>> 08a485ace8bc8e3c7a5405ece324d829356cacf1
