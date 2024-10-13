import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Receipt = InferSelectModel<typeof receipts>;

interface OrdersProps {
  receipts: Receipt[];
  onOrderSelect: (orderId: number) => void;
}

const Orders: React.FC<OrdersProps> = ({ receipts, onOrderSelect }) => {
  return (
    <div className="min-w-[60%] rounded-2xl border-2 border-[#484848] bg-[#2f2f2f] p-3 text-white shadow-xl">
      <h2 className="flex items-center p-10 pb-12 text-[48px] font-semibold">
        Orders
        <span className="ml-5 inline-flex items-center rounded-3xl bg-[#f6f930] px-3 py-2 text-[20px] font-semibold text-black">
          100
        </span>
      </h2>
      <div className="max-h-[720px] overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="relative text-[24px]">
              <th className="sticky top-0 bg-[#2f2f2f] pl-10 text-left font-medium">
                Order#
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] text-left font-medium">
                Date
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] text-left font-medium">
                Name
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] py-5 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((order) => (
              <tr
                key={order.id}
                className="overflow-hidden text-xl cursor-pointer hover:bg-[#5a5a5a]"
                onClick={() => onOrderSelect(order.id)}
              >
                <td className="py-8 pl-10 text-left text-[#f6f930]">
                  {order.id}
                </td>
                <td className="py-8 text-left text-[#c4c4c4]">
                  {order.purchase_date.toLocaleDateString()}
                </td>
                <td className="py-8 text-left font-extralight">{order.buyer}</td>
                <td className="py-8 text-left">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
