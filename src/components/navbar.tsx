import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex w-full items-center justify-between pt-6 sm:pt-8 lg:pt-10 pb-2 sm:pb-2 lg:pb-4 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex items-center gap-x-16">
        <Link href="/" className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f6f930]">Ind<span className="text-[#ffffff]">order</span>.</Link>
        <Link href="/dashboard" className="text-2xl md:text-3xl lg:text-4xl  text-[#f6f930] font-semibold">Dashboard</Link>
      </div>
    </div>
  );
}
