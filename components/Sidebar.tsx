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

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
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
            fixed md:relative z-50 h-full md:h-auto bg-white dark:bg-dark-blue
            border-r border-gray-600 dark:border-gray-600 transition-all duration-300 text flex flex-col justify-between
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${open ? "w-64" : "md:w-16"}
            md:translate-x-0
          `}
      >
        <div>
          {/* Nav */}
          <p className={`space-y-3 ${open ? "p-4" : "px-1.5 py-4"}`}>
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => {
                    if (window.innerWidth < 768) setOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-md
                  hover:bg-primary-300 hover:text-black transition font-semibold
                  ${isActive ? "bg-primary-500 text-black" : ""}
                  whitespace-nowrap overflow-hidden
                  `}
                >
                  <Icon className="rounded-full min-w-[25px]" size={25} />
                  <span
                    className={`transition-opacity duration-300 ${
                      open
                        ? "opacity-100"
                        : "opacity-0 md:opacity-0 md:hidden group-hover:block"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </p>
        </div>

        <div
          className="p-4 flex items-center gap-2 border-t border-gray-600 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div>
            {open ? (
              <FiChevronLeft className="m-1" size={20} />
            ) : (
              <FiChevronRight className="m-1" size={20} />
            )}
          </div>
          <p
            title="Collapse"
            className="bg-transparent w-fit text hover:cursor-pointer hover:bg-none whitespace-nowrap overflow-hidden"
          >
            {open && "Collapse"}
          </p>
        </div>
      </aside>
    </>
  );
}
