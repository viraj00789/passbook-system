"use client";

import { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineCog,
} from "react-icons/hi2";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: HiOutlineHome, href: "/dashboard" },
  { label: "Transactions", icon: HiOutlineCurrencyDollar, href: "/transactions" },
  { label: "Accounts", icon: HiOutlineCreditCard, href: "/accounts" },
  { label: "Clients", icon: HiOutlineUsers, href: "/clients" },
  { label: "Employees", icon: HiOutlineUserGroup, href: "/employees" },
  { label: "Expenses", icon: HiOutlineCurrencyDollar, href: "/expenses" },
  { label: "Invoices", icon: HiOutlineDocumentText, href: "/invoices" },
  { label: "Settings", icon: HiOutlineCog, href: "/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`h-screen border-r bg-dark-blue transition-all duration-300
      ${open ? "w-64" : "w-16"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2">
          <HiOutlineCurrencyDollar size={28} />
          {open && <span className="text-xl font-semibold">Maglo</span>}
        </div>
        <button onClick={() => setOpen(!open)}>
          {open ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Nav */}
      <nav className={`space-y-4 ${open ? "px-4" : "px-2"}`}>
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-2 py-2 rounded-md
              hover:bg-primary-500 hover:text-black transition font-semibold"
          >
            <Icon size={22} />
            {open && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
