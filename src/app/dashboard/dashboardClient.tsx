"use client";

import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React, { useState } from "react";

import Analytics from "./analytics";
import OrderInfo from "./orderinfo";
import Orders from "./orders";

type Receipt = InferSelectModel<typeof receipts>;

type OrderInfoProps = {
  orderId: number | null;
};

export default function DashboardClient({ receipts }: { receipts: Receipt[] }) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(
    receipts?.[0]?.id,
  );

  return (
    <div className="flex w-full flex-col md:flex-row gap-y-6 md:gap-x-3 lg:gap-x-6 xl:gap-x-12 pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-8 lg:px-16 xl:px-32">
      <div className="w-full">
        <Orders receipts={receipts} onOrderSelect={setSelectedOrderId} />
      </div>
      <div className="flex w-full lg:w-[60%] flex-col gap-y-2">
        <div className="hidden md:block lg:block">
          <OrderInfo receipts={receipts} orderId={selectedOrderId} />
        </div>
        <Analytics receipts={receipts} />
      </div>
    </div>
  );
}
