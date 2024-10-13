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
    <div className="container min-h-[15rem] rounded-2xl border-2 border-[#575757] bg-[#2f2f2f] p-3 px-3 text-white sm:p-6 sm:px-6 lg:min-h-[20rem] lg:p-10 lg:px-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[0.8rem] font-semibold sm:text-[0.8rem] md:text-[1.3rem] lg:text-[1.8rem]">
          Order info:{" "}
          <span className="font-light text-[#f6f930] underline">
            #{orderId ?? "N/A"}
          </span>
        </h2>
        <p className="text-[0.8rem] font-light sm:text-[0.8rem] md:text-[1.3rem] lg:text-[1.5rem]">
          Date:
          <span className="pl-0 text-[0.8rem] font-light text-[#c4c4c4] sm:pl-0 sm:text-[0.8rem] md:pl-1 md:text-[1.3rem] lg:pl-2">
            {receipt?.purchase_date.toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="flex justify-between pb-4 text-[0.8rem] sm:text-[0.8rem] md:text-[1.0rem] lg:text-[1.5rem]">
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
                  <tr className="text-[0.8rem] sm:text-[0.8rem] md:text-[1.0rem] lg:text-[1.5rem]">
                    <th className="pb-2 text-left font-normal">Item</th>
                    <th className="pb-2 text-center font-normal">Quantity</th>
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
                          <td className="py-3 text-left font-light">{name}</td>
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
        <div className="text-[0.8rem] sm:text-[0.8rem] md:w-[50%] md:text-[1.0rem] lg:w-[55%] lg:pl-5 lg:text-[1.3rem]">
          <p className="font-extralight underline text-center">{receipt?.phone_num}</p>
          <div className="w-full">
            <div className="flex flex-row pt-6">
              <div className="text-[0.8rem] font-normal sm:text-[0.8rem] md:pr-1 md:text-[1.0rem] lg:pr-2 lg:text-[1.3rem]">
                Address:
              </div>
              <div className="text-left font-extralight md:text-[0.9rem] lg:text-[1.0rem]">
                <div>{receipt?.address?.split(",")[0]}</div>
                <div className="text-left">
                  {receipt?.address?.split(",").slice(1).join(",").trim()}
                </div>
              </div>
            </div>
            <h1 className="pt-6 text-[0.8rem] font-normal sm:text-[0.8rem] md:text-[1.0rem] lg:text-[1.3rem]">
              Total:{" "}
              <span className="pl-2 text-[0.8rem] font-extralight sm:text-[0.8rem] md:text-[1.0rem] lg:text-[1.3rem]">
                $238.19
              </span>
            </h1>
            <h1 className="pt-6">
              Status:{" "}
              <span className="pl-2 text-[0.8rem] font-extralight sm:text-[0.8rem] md:text-[1.0rem] lg:text-[1.3rem]">
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
