import { receipts } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";

type Receipt = InferSelectModel<typeof receipts>;

type OrderInfoProps = {
  receipts: Receipt[];
  orderId: number | undefined;
};

const OrderInfo: React.FC<OrderInfoProps> = ({ receipts, orderId }) => {
  const receipt = receipts.find((r) => r.id === orderId) ?? receipts[0];
  if (!receipt) return <></>;
  return (
    <div className="container min-h-[400px] rounded-2xl border-2 border-[#717171] bg-[#2f2f2f] p-10 px-12 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[42px] font-semibold">
          Order info:{" "}
          <span className="font-light text-[#f6f930] underline">
            #{orderId ?? "N/A"}
          </span>
        </h2>
        <p className="text-[24px] font-light">
          Date:
          <span className="pl-4 text-[24px] font-light text-[#c4c4c4]">
            {receipt?.purchase_date.toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="flex justify-between pb-4 text-[24px]">
        <div className="w-[40%]">
          <h1 className="pb-4">
            Name:{" "}
            <span className="pl-2 text-[22px] font-extralight">
              {receipt?.buyer
                ?.split(" ")
                .map((name, index) => (index === 0 ? name : name[0]))
                .join(" ")}
            </span>
          </h1>
          <div className="w-[220px] rounded-lg bg-[#484848] p-3 shadow-xl">
            <div className="max-h-[200px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#484848]">
                  <tr className="text-[22px]">
                    <th className="pb-2 text-center font-normal">Item</th>
                    <th className="pb-2 text-center font-normal">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.productDescription
                    ?.split(", ")
                    .map((item, index) => {
                      const [name, quantity] = item.split(":");
                      return (
                        <tr key={index} className="text-[18px]">
                          <td className="py-3 text-center font-light">
                            {name}
                          </td>
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
        <div className="w-[55%] text-[22px]">
          <p className="">
            Phone Number:{" "}
            <span className="pl-4 font-extralight underline">
              {receipt?.phone_num}
            </span>
          </p>
          <div className="w-full">
            <div className="flex flex-row justify-between pt-6">
              <div className="text-[22px] font-normal">Address:</div>
              <div className="text-left text-[20px] font-extralight">
                <div>{receipt?.address?.split(",")[0]}</div>
                <div>
                  {receipt?.address?.split(",").slice(1).join(",").trim()}
                </div>
              </div>
            </div>
            <h1 className="pt-6 text-[22px] font-normal">
              Total:{" "}
              <span className="pl-2 text-[20px] font-extralight">$238.19</span>
            </h1>
            <h1 className="pt-6">
              Status:{" "}
              <span className="pl-2 text-[20px] font-extralight">
                {receipt?.status}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
