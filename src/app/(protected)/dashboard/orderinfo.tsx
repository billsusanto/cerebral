import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Receipt = InferSelectModel<typeof receipts>;

export default function OrderInfo({
  receipts,
  orderId,
}: {
  receipts: Receipt[];
  orderId: number | undefined;
}) {
  const receipt = receipts.find((r) => r.id === orderId) ?? receipts[0];
  if (!receipt) return <></>;

  const randomTotal = React.useMemo(() => {
    const seed = receipt.id || 0;
    const random = Math.sin(seed) * 10000;
    return (Math.floor((random - Math.floor(random)) * (300 - 20 + 1) + 20)).toFixed(2);
  }, [receipt.id]);

  return (
    <div className="container min-h-[15rem] rounded-2xl border-2 border-[#575757] bg-[#2f2f2f] p-3 px-3 text-white sm:p-6 sm:px-6 lg:min-h-[20rem] lg:p-10 lg:px-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
          Order info:{" "}
          <span className="font-light text-[#f6f930] underline">
            {orderId ? `#${orderId.toString().padStart(4, '0')}` : "N/A"}
          </span>
        </h2>
        <p className="text-base font-light sm:text-lg md:text-xl lg:text-2xl">
          Date:
          <span className="pl-0 font-light text-[#c4c4c4] sm:pl-2 text-base sm:text-md md:text-lg lg:text-xl">
            {receipt?.purchaseDate.toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="flex justify-between pb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
        <div className="md:w-[40%] lg:w-[50%]">
          <h1 className="pb-4">
            Name:{" "}
            <span className="pl-0 font-extralight lg:pl-2">
              {receipt?.buyer
                ?.split(" ")
                .map((name, index) => (index === 0 ? name : name[0]))
                .join(" ")}
            </span>
          </h1>
          <div className="w-full rounded-2xl bg-[#484848] p-3 shadow-xl">
            <div className="overflow-y-auto md:h-[150px] lg:h-[200px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#484848]">
                  <tr className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    <th className="pb-2 lg:pl-3 text-left font-normal w-1/2">Item</th>
                    <th className="pb-2 text-center font-normal w-1/2">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(3)
                    .fill(null)
                    .map((_, rowIndex) => {
                      const item =
                        receipt.productDescription?.split(", ")[rowIndex];
                      const [name, quantity] = item
                        ? item.split(":")
                        : ["---", "---"];
                      return (
                        <tr
                          key={rowIndex}
                          className="md:text-[13px] lg:text-[18px]"
                        >
                          <td className="py-3 lg:pl-3 text-left font-light">{name}</td>
                          <td className="py-3 text-center font-light">
                            {quantity}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-base sm:text-lg md:w-[50%] md:text-xl lg:w-[55%] lg:pl-5 lg:text-2xl">
          <span>
            Phone Number: <br />
          </span>
          <p className="font-extralight underline text-base sm:text-md md:text-lg lg:text-xl">
            {receipt?.phoneNumber}
          </p>
          <div className="w-full">
            <div className="pt-6">
              Address:
              <div className="text-left font-extralight md:text-lg lg:text-xl">
                <div>{receipt?.address?.split(",")[0]}</div>
                <div className="text-left">
                  {receipt?.address?.split(",").slice(1).join(",").trim()}
                </div>
              </div>
            </div>
            <h1 className="pt-4 font-normal">
              {receipt?.status === "FLAGGED" ? "Additional Data" : "Total"}:{" "}
              <span className="font-extralight text-base sm:text-md md:text-lg lg:text-xl">
                {receipt?.status === "FLAGGED" ? receipt.additionalData : `$${randomTotal}`}
              </span>
            </h1>
            <h1 className="pt-6">
              Status:{" "}
              <span
                className="rounded-full md:px-3 md:py-1 lg:px-5 lg:py-2 text-base sm:text-md md:text-md lg:text-xl"
                style={{
                  backgroundColor:
                    receipt?.status === "COMPLETED"
                      ? "#426142"
                      : receipt?.status === "INPROGRESS"
                        ? "#615D42"
                        : receipt?.status === "CANCELLED"
                          ? "#614242"
                          : receipt?.status === "FLAGGED"
                            ? "#6d6d6d"
                            : "#2f2f2f",
                  color:
                    receipt?.status === "COMPLETED"
                      ? "#94FF8E"
                      : receipt?.status === "INPROGRESS"
                        ? "#FBFF8E"
                        : receipt?.status === "CANCELLED"
                          ? "#FF8E8E"
                          : receipt?.status === "FLAGGED"
                            ? "#FFFFFF"
                            : "#FFFFFF",
                }}
              >
                {receipt?.status}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
