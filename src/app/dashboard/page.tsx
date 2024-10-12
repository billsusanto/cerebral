import React from "react";

import Analytics from "./analytics";
import Orders from "./orders";

const DashboardPage: React.FC = () => {
  return (
    <div className="w-5/6 flex flex-row gap-x-12 pt-10">
      <Orders />
      <Analytics />
    </div>
  );
};

export default DashboardPage;
