import { getAllReceipts } from "~/actions/receipts";
import React from "react";
import { Navbar } from "~/components/navbar";

import DashboardClient from "./dashboardClient";

export default async function DashboardPage() {
  const receipts = await getAllReceipts();
  console.log(receipts);

  return (
    <>
      <Navbar />
      <DashboardClient receipts={receipts} />
    </>
  );
}
