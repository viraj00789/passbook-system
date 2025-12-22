import { useSidebar } from "@/Providers/SideBarContext";
import { useMemo, useState, ReactNode } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

export type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
}

export default function DataTable<T extends object>({
  title,
  columns,
  data,
  searchable = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const { open } = useSidebar();

  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  /* 🔃 Sorting */
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDirection]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full border rounded-2xl border-gray-200 dark:border-gray-700">

      <div className="flex justify-between items-center rounded-t-2xl p-4 bg-white dark:bg-gray-800">
        <div className="text-xl font-bold ">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        {searchable && (
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-62.5 md:w-1/3 px-4 py-2 rounded-xl
              bg-background text-foreground border
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary "
          />
        )}
      </div>

      {/* 📊 Table Wrapper (THIS ENABLES HORIZONTAL SCROLL) */}
      <div
        className={`overflow-x-auto w-full ${open ? "max-w-[calc(100vw-284px)]" : "max-w-[calc(100vw-111px)]"
          }`}
      >
        <table className="min-w-max w-full text-sm rounded-2xl border-gray-200 dark:border-gray-800">
          {/* Desktop Header */}
          <thead className="">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.label}
                  onClick={() =>
                    col.sortable && col.key !== "actions"
                      ? handleSort(col.key as keyof T)
                      : undefined
                  }
                  className={`p-3 lg:p-4 text-left font-bold  dark:text-gray-500 text
                    ${col.sortable ? "cursor-pointer select-none" : ""}
                  `}
                >
                  <div className="flex items-center gap-2 text-lg">
                    {col.label}
                    {sortKey === col.key && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? (
                          <BiUpArrow className="bg-gray-100" />
                        ) : (
                          <BiDownArrow className="bg-gray-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white dark:bg-gray-900">
            {sortedData.length ? (
              sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="mb-4 md:mb-0
                    rounded-lg md:rounded-none
                    hover:bg-gray-200 dark:hover:bg-gray-800
                    transition
                  "
                >
                  {columns.map((col) => (
                    <td
                      key={col.label}
                      data-label={col.label}
                      className="
                        p-4.5 text-foreground
                        before:text-gray-600 dark:before:text-gray-400
                        before:mb-1
                      "
                    >
                      {col.render
                        ? col.render(row)
                        : col.key !== "actions"
                          ? String(row[col.key])
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
