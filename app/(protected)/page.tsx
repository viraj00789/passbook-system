"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, FilterState } from "@/components/dashboard/Filters/filter";
import CardDataStates from "@/components/dashboard/Cards/CardDataStates";
import { statsData } from "@/Data/graphStatesData";
import AreaGraph from "@/components/dashboard/Graph/AreaGraph";
import CardStack from "@/components/dashboard/Cards/CredritCardStacks";
import TableUsageExample from "@/components/dashboard/Cards/UserTable";

export default function Dashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterState>({
    type: "day",
    dateRange: {
      start: null,
      end: null,
    },
  });
  console.log("🚀 ~ Dashboard ~ filter:", filter);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("auth");
    router.replace(isAuthenticated ? "/" : "/sign-in");
  }, [router]);

  return (
    <>
      <div className="flex justify-between items-center sticky top-0 bg-gray-100 dark:bg-dark-blue p-2 lg:p-4">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text">
          Dashboard
        </h1>
        <Filter filter={filter} onFilterChange={setFilter} />
      </div>
      <div className="px-2 lg:px-4 h-[calc(100vh-150px)] overflow-auto">
        <div className="grid gap-2 md:gap-3 lg:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData?.map((stat, index) => (
            <CardDataStates key={index} {...stat} />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <AreaGraph />
          <CardStack />
        </div>
        <div className="mt-2 lg:mt-6 space-y-0 lg:space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <TableUsageExample />
        </div>
      </div>
    </>
  );
}
