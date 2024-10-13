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
    <div className="
      flex flex-col lg:flex-row
      gap-y-3 md:gap-x-3 lg:gap-x-6 xl:gap-x-12
      p-6 pt-8 lg:pt-10
      px-4 sm:px-8 lg:px-16 xl:px-32
      md:w-[93%] lg:w-full
    ">
      <div className="w-full">
        <Orders receipts={receipts} onOrderSelect={setSelectedOrderId} />
      </div>
      <div className="flex flex-col items-center gap-y-2 md:w-[100%] lg:w-[80%] mx-auto">
        <div className="hidden lg:block w-full">
          <OrderInfo receipts={receipts} orderId={selectedOrderId} />
        </div>
        <div className="w-full">
          <Analytics receipts={receipts} />
        </div>
      </div>
    </div>
  );
}
