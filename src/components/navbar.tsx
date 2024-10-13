import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import github from "public/github.svg";

import { Button } from "./ui/button";

export function Navbar() {
  return (
    <div className="flex w-full items-center justify-between pt-6 sm:pt-8 lg:pt-10 pb-2 sm:pb-2 lg:pb-4 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex items-center gap-x-16">
        {/* <Link
          className="cursor-pointer transition-all hover:opacity-80"
          href="https://github.com/scottsus/cerebral"
          target="_blank"
        >
          <Image src={github} alt="GitHub" width={50} height={50} />
        </Link> */}
        <Link href="/" className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f6f930]">Ind<span className="text-[#ffffff]">order</span>.</Link>
        <Link href="/dashboard" className="text-sm md:text-xl lg:text-xl text-[#f6f930] font-semibold">Dashboard</Link>
        <Link href="/settings" className="text-sm md:text-xl lg:text-xl text-white font-semibold">Settings</Link>
      </div>

      <div className="flex">
        {/* <SignedOut>
          <SignInButton>
            <Button variant="custom" size="custom">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </div>
  );
}
