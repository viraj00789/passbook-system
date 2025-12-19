"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, FilterState } from "@/components/dashboard/Filters/filter";
import CardDataStates from "@/components/dashboard/Cards/CardDataStates";
import { statsData } from "@/Data/graphStatesData";
import AreaGraph from "@/components/dashboard/Graph/AreaGraph";

export default function Dashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterState>({
    type: "day",
    dateRange: {
      start: null,
      end: null,
    },
  })
  console.log("🚀 ~ Dashboard ~ filter:", filter)

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    router.replace(isAuthenticated ? "/" : "/sign-in");
  }, [router]);

  return (
    <div className="p-2 lg:p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text">Dashboard</h1>
        <Filter filter={filter}
          onFilterChange={setFilter} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData?.map((stat, index) => (
          <CardDataStates key={index} {...stat} />
        ))}
      </div>
      <div>
        <AreaGraph />
      </div>
    </div >
  );
}
