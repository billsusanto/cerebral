import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import github from "public/github.svg";

import { Button } from "./ui/button";

export function Navbar() {
  return (
    <div className="flex w-5/6 items-center justify-between pt-10 pb-8">
      <div className="flex items-center gap-x-4">
        <Link
          className="cursor-pointer transition-all hover:opacity-80"
          href="https://github.com/scottsus/cerebral"
          target="_blank"
        >
          <Image src={github} alt="GitHub" width={50} height={50} />
        </Link>
        <h1 className="text-4xl font-bold text-[#f6f930]">Ind<span className="text-[#ffffff]">order</span>.</h1>
      </div>

      <div className="flex items-center gap-x-16">
        <Link href="/dashboard" className="text-xl text-white font-semibold">Dashboard</Link>
        <Link href="/contact" className="text-xl text-white font-semibold">Contact Us</Link>
        <SignedOut>
          <SignInButton>
            <Button variant="custom" size="custom">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
