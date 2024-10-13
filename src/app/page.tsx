import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex h-screen w-[65%]">
      <div className="flex h-full w-4/5 flex-col items-center justify-center">
        <h1 className="text-8xl font-extrabold text-[#f6f930]">
          Ind<span className="text-[#ffffff]">order</span>.
        </h1>
        <br />
        <p className="text-5xl font-semibold text-white">
          Where orders meets{" "}
          <span className="font-bold text-[#f6f930]">AI</span>.
        </p>
      </div>

      <div className="flex h-full w-2/5 items-center justify-start pr-8">
        <SignedOut>
          <div className="flex flex-col gap-4">
            <SignInButton >
              <Button variant="signIn" size="signIn">
                Sign In
              </Button>
            </SignInButton>
            <span className="text-white text-center font-light text-xl">Or</span>
            <SignUpButton>
              <Button variant="signUp" size="signUp">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </main>
  );
}
