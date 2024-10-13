import { getAllReceipts } from "~/actions/receipts";
import React from "react";

import DashboardClient from "./dashboardClient";

export default async function DashboardPage() {
  const receipts = await getAllReceipts();

  return (
    <>
      <DashboardClient receipts={receipts} />
    </>
  );
}
