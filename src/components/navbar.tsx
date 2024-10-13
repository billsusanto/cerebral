import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import github from "public/github.svg";

import { Button } from "./ui/button";

export function Navbar() {
  return (
    <div className="flex w-5/6 items-center justify-between pb-8 pt-10">
      <div className="flex items-center gap-x-4">
        <Link
          href="https://github.com/scottsus/cerebral"
          className="cursor-pointer transition-all hover:opacity-60"
          target="_blank"
        >
          <Image src={github} alt="GitHub" width={50} height={50} />
        </Link>
        <Link
          href="/"
          className="cursor-pointer transition-all hover:opacity-70"
        >
          <h1 className="text-4xl font-bold text-primary">
            Ind<span className="text-[#ffffff]">order</span>.
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-16">
        <Link href="/dashboard" className="text-xl font-semibold text-white">
          Dashboard
        </Link>
        <Link href="/contact" className="text-xl font-semibold text-white">
          Contact Us
        </Link>
        <SignedOut>
          <SignInButton>
            <Button variant="custom" size="custom">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
