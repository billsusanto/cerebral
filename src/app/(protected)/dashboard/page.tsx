import { currentUser } from "@clerk/nextjs/server";
import { getAllReceiptsByUserId } from "~/actions/receipts";
import { getUserByEmail } from "~/actions/user";
import { redirect } from "next/navigation";
import React from "react";

import DashboardClient from "./dashboardClient";

export default async function DashboardPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }
  const email = clerkUser?.emailAddresses[0]?.emailAddress as string;
  const userId = await getUserByEmail({ email });
  const receipts = await getAllReceiptsByUserId(userId?.id as string);

  return (
    <>
      <DashboardClient receipts={receipts} />
    </>
  );
}
