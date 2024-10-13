import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Receipt = InferSelectModel<typeof receipts>;

interface OrdersProps {
  receipts: Receipt[];
  onOrderSelect: (orderId: number) => void;
}

const Orders: React.FC<OrdersProps> = ({ receipts, onOrderSelect }) => {
  const displayReceipts = Array(7).fill(null).map((_, index) => receipts[index] || {
    id: -1,
    purchase_date: new Date(0),
    buyer: '---',
    status: '---'
  });

  return (
    <div className="rounded-2xl border-2 border-[#575757] bg-[#2f2f2f] p-3 text-white shadow-xl">
      <h2 className="flex items-center p-3 sm:p-6 md:p-6 lg:p-10 pb-2 sm:pb-6lg:pb-12 text-2xl sm:text-[24px] lg:text-[48px] font-semibold">
        Orders
        <span className="ml-4 sm:ml-3 lg:ml-5 inline-flex items-center rounded-3xl bg-[#f6f930] px-2 py-1 sm:px-2 sm:py-2 lg:px-3 lg:py-2 text-xl sm:text-[18px]lg:text-[20px] font-semibold text-black">
          {receipts.length}
        </span>
      </h2>
      <div className="overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="relative text-lg sm:text-[16px] lg:text-[24px]">
              <th className="sticky top-0 bg-[#2f2f2f] pl-3 sm:pl-6 lg:pl-10 text-left font-medium">
                Order#
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] text-left font-medium">
                Date
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] text-left font-medium">
                Name
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] py-2 sm:py-3 lg:py-5 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayReceipts.map((order, index) => (
              <tr
                key={order.id !== -1 ? order.id : `empty-${index}`}
                className={`overflow-hidden text-sm sm:text-[14px] md:text-[14px] lg:text-[24px] ${order.id !== -1 ? 'cursor-pointer hover:bg-[#5a5a5a]' : ''}`}
                onClick={() => order.id !== -1 && onOrderSelect(order.id)}
              >
                <td className="py-[1rem] lg:py-7 pl-3 sm:pl-6 lg:pl-10 text-left text-[#f6f930]">
                  {order.id !== -1 ? order.id : '---'}
                </td>
                <td className="py-[1rem] lg:py-7 text-left text-[#c4c4c4]">
                  {order.id !== -1 ? order.purchase_date.toLocaleDateString() : '---'}
                </td>
                <td className="py-[1rem] text-left font-extralight">{order.buyer}</td>
                <td className="py-[1rem] text-left font-extralight md:font-normal">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
