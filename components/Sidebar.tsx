"use client";

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
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/Providers/SideBarContext";

const navItems = [
  { label: "Dashboard", icon: HiOutlineHome, href: "/" },
  {
    label: "Transactions",
    icon: HiOutlineCurrencyDollar,
    href: "/transactions",
  },
  { label: "Accounts", icon: HiOutlineCreditCard, href: "/accounts" },
  { label: "Clients", icon: HiOutlineUsers, href: "/clients" },
  { label: "Employees", icon: HiOutlineUserGroup, href: "/employees" },
  { label: "Expenses", icon: HiOutlineCurrencyDollar, href: "/expenses" },
  { label: "Invoices", icon: HiOutlineDocumentText, href: "/invoices" },
  { label: "Settings", icon: HiOutlineCog, href: "/settings" },
];

export default function Sidebar() {
  const { open, setOpen, toggle } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-dark-blue/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50 h-full bg-white dark:bg-dark-blue
          border-r border-gray-200 dark:border-gray-600
          transition-all duration-300 flex flex-col justify-between
          ${
            open
              ? "w-64 translate-x-0"
              : "w-16 -translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Nav */}
        <nav className={`space-y-3 ${open ? "p-4" : "px-1.5 py-4"}`}>
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`
                  flex items-center gap-3 p-3 rounded-md font-semibold
                  hover:bg-primary-300 hover:text-black transition
                  ${isActive ? "bg-primary-500 text-black" : "text-white"}
                `}
                onClick={() => {
                  if (window.innerWidth < 768) setOpen(false);
                }}
              >
                <Icon size={24} />
                {open && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle */}
        <button
          onClick={toggle}
          className="p-5 flex items-center gap-2 border-t border-gray-200 dark:border-gray-600"
        >
          {open ? (
            <FiChevronLeft className="text" />
          ) : (
            <FiChevronRight className="text" />
          )}
          {open && <span className="text">Collapse</span>}
        </button>
      </aside>
    </>
  );
}
