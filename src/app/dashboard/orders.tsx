import React from "react";

const Orders = () => {
  const orderData = [
    {
      orderNumber: "ORD-1000",
      date: "10/12/2024",
      name: "Customer 1",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1001",
      date: "10/12/2024",
      name: "Customer 2",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1002",
      date: "10/12/2024",
      name: "Customer 3",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1003",
      date: "10/12/2024",
      name: "Customer 4",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1004",
      date: "10/12/2024",
      name: "Customer 5",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1005",
      date: "10/12/2024",
      name: "Customer 6",
      status: "Delivered",
    },
    {
      orderNumber: "ORD-1006",
      date: "10/12/2024",
      name: "Customer 7",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1007",
      date: "10/12/2024",
      name: "Customer 8",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1008",
      date: "10/12/2024",
      name: "Customer 9",
      status: "Delivered",
    },
    {
      orderNumber: "ORD-1009",
      date: "10/12/2024",
      name: "Customer 10",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1010",
      date: "10/12/2024",
      name: "Customer 11",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1011",
      date: "11/12/2024",
      name: "Customer 12",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1012",
      date: "11/12/2024",
      name: "Customer 13",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1013",
      date: "11/12/2024",
      name: "Customer 14",
      status: "Delivered",
    },
    {
      orderNumber: "ORD-1014",
      date: "11/12/2024",
      name: "Customer 15",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1015",
      date: "11/12/2024",
      name: "Customer 16",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1016",
      date: "12/12/2024",
      name: "Customer 17",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1017",
      date: "12/12/2024",
      name: "Customer 18",
      status: "Delivered",
    },
    {
      orderNumber: "ORD-1018",
      date: "12/12/2024",
      name: "Customer 19",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1019",
      date: "12/12/2024",
      name: "Customer 20",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1020",
      date: "12/12/2024",
      name: "Customer 21",
      status: "Shipped",
    },
    {
      orderNumber: "ORD-1021",
      date: "13/12/2024",
      name: "Customer 22",
      status: "Delivered",
    },
    {
      orderNumber: "ORD-1022",
      date: "13/12/2024",
      name: "Customer 23",
      status: "Pending",
    },
    {
      orderNumber: "ORD-1023",
      date: "13/12/2024",
      name: "Customer 24",
      status: "Shipped",
    },
  ];

  return (
    <div className="w-full rounded-2xl border-2 border-[#717171] bg-[#2f2f2f] p-3 text-white">
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
              <th className="sticky top-0 w-1/5 bg-[#2f2f2f] pl-10 text-left font-medium">
                Order#
              </th>
              <th className="sticky top-0 w-1/5 bg-[#2f2f2f] pl-10 text-left font-medium">
                Date
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] pl-10 text-left font-medium">
                Name
              </th>
              <th className="sticky top-0 bg-[#2f2f2f] py-5 pl-10 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr
                key={index}
                className="overflow-hidden rounded-xl text-xl"
              >
                <td className="py-8 pl-10 text-left text-[#f6f930]">
                  {order.orderNumber}
                </td>
                <td className="py-8 pl-10 text-left text-[#c4c4c4]">
                  {order.date}
                </td>
                <td className="py-8 pl-10 text-left">{order.name}</td>
                <td className="py-8 pl-10 text-left">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
