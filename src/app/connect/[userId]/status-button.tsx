"use client";

import { getListenerStatus } from "~/actions/user";
import { cn } from "~/lib/utils";
import { listenerStatusEnum } from "~/server/db/schema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export function StatusButton({ userId }: { userId: string }) {
  const [status, setStatus] = useState<
    (typeof listenerStatusEnum.enumValues)[number] | null | undefined
  >();
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function checkStatus() {
      const currentStatus = await getListenerStatus({ userId });
      setStatus(currentStatus);

      if (currentStatus !== "RUNNING") {
        const CHECK_INTERVAL = 5_000;
        timeoutId = setTimeout(checkStatus, CHECK_INTERVAL);
      }
    }

    checkStatus();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <Link href="/dashboard">
      <button
        className={cn(
          "rounded-lg bg-primary px-6 py-3 text-lg transition-all hover:brightness-125",
          status !== "RUNNING" ? "disabled opacity-40" : "",
        )}
      >
        {status !== "RUNNING" ? (
          <div className="flex items-center justify-center">
            <Oval height="24" width="24" color="#ffffff" />
            <span className="ml-2">waiting for WhatsApp connection...</span>
          </div>
        ) : (
          "Dashboard"
        )}
      </button>
    </Link>
  );
}
