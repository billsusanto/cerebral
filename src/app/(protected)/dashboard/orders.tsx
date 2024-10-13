import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Receipt = InferSelectModel<typeof receipts>;

export default function Orders({
  receipts,
  onOrderSelect,
}: {
  receipts: Receipt[];
  onOrderSelect: (orderId: number) => void;
}) {
  const displayReceipts = Array(Math.max(7, receipts.length))
    .fill(null)
    .map(
      (_, index) =>
        receipts[index] || {
          id: -1,
          purchaseDate: new Date(0),
          buyer: "---",
          status: "---",
        },
    );

  return (
    <div className="rounded-2xl border-2 border-[#575757] bg-[#2f2f2f] p-3 text-white shadow-xl">
      <h2
        className={`flex items-center p-2 pb-2 text-xs font-semibold sm:p-6 sm:pb-6 md:p-6 md:text-3xl lg:p-8 lg:pb-10 lg:text-5xl`}
      >
        Orders
        <span
          className={`ml-4 inline-flex items-center rounded-xl bg-[#f6f930] px-3 py-1 text-xs font-bold text-black sm:ml-3 sm:px-3 sm:py-2 md:text-lg lg:ml-5 lg:px-4 lg:py-2 lg:text-3xl`}
        >
          {receipts.length}
        </span>
        <div className="ml-auto flex items-center text-xs md:text-lg lg:text-2xl font-medium">
          <span className="mr-2 rounded-full border-2 border-[#f6f930] p-2 px-5 lg:px-10 py-1">
            Oct
          </span>
          <span className="rounded-full border-2 border-[#f6f930] p-2 px-5 lg:px-10 py-1">
            2024
          </span>
        </div>
      </h2>
      <div className="sm:h-[300px] md:h-[580px] h-[450px] overflow-auto lg:h-[620px]">
        <table className="w-full table-auto">
          <thead>
            <tr className="sm:text-md relative text-xs md:text-lg lg:text-xl">
              <th className="sticky top-0 bg-[#2f2f2f] pl-3 text-left font-medium sm:pl-6 lg:pl-10">
                Order#
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] text-left font-medium">
                Date
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] text-left font-medium">
                Name
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] py-2 text-left font-medium sm:py-3 lg:py-5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayReceipts.map((order, index) => (
              <tr
                key={order.id !== -1 ? order.id : `empty-${index}`}
                className={`sm:text-md overflow-hidden text-xs md:text-lg lg:text-xl ${order.id !== -1 ? "cursor-pointer hover:bg-[#5a5a5a]" : ""}`}
                onClick={() => order.id !== -1 && onOrderSelect(order.id)}
              >
                <td className="py-[1rem] pl-3 text-left text-[#f6f930] sm:pl-6 lg:py-7 lg:pl-10">
                  {order.id !== -1 ? `#${order.id.toString().padStart(4, '0')}` : "---"}
                </td>
                <td className="py-[1rem] text-left text-[#c4c4c4] lg:py-7">
                  {order.id !== -1
                    ? order.purchaseDate.toLocaleDateString()
                    : "---"}
                </td>
                <td className="py-[1rem] text-left font-extralight">
                  {order.buyer}
                </td>
                <td className="py-[1rem] text-left font-extralight md:font-normal">
                  <span
                    className="rounded-full px-5 py-2"
                    style={{
                      backgroundColor:
                        order.status === "COMPLETED"
                          ? "#426142"
                          : order.status === "INPROGRESS"
                            ? "#615D42"
                            : order.status === "CANCELLED"
                              ? "#614242"
                              : order.status === "FLAGGED"
                                ? "#6d6d6d"
                                : "#2f2f2f",
                      color:
                        order.status === "COMPLETED"
                          ? "#94FF8E"
                          : order.status === "INPROGRESS"
                            ? "#FBFF8E"
                            : order.status === "CANCELLED"
                              ? "#FF8E8E"
                              : order.status === "FLAGGED"
                                ? "#FFFFFF"
                                : "#FFFFFF",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
