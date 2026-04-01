import React from "react";
import Navbar from "@nextui-org/navbar";

import { Table } from "@tremor/react";

import { LevelChart } from "@tremor/react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      Holaa
      <div className="dashboard-content">
        <div className="main-content">
          <div className="secondary-content">
            <LevelChart />
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
