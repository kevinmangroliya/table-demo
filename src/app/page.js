"use client";

import DataTable from "@/components/DataTable";
import { Input } from "antd";
import React, { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold my-8">To Do Data</h1>
      <div className="mb-8">
        <span>Filter By Name: </span>
        <Input id="name" onChange={handleFilterChange} />
      </div>
      <DataTable filter={filter} />
    </div>
  );
}
