"use client";

import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React, { useState } from "react";

import Analytics from "./analytics";
import OrderInfo from "./orderinfo";
import Orders from "./orders";

type Receipt = InferSelectModel<typeof receipts>;

export default function DashboardClient({ receipts }: { receipts: Receipt[] }) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(
    receipts?.[0]?.id,
  );

  return (
    <div className="flex w-5/6 flex-row gap-x-12 pt-10">
      <Orders receipts={receipts} onOrderSelect={setSelectedOrderId} />
      <div className="flex w-[40%] flex-col gap-y-12">
        <OrderInfo receipts={receipts} orderId={selectedOrderId} />
        <Analytics />
      </div>
    </div>
  );
}
