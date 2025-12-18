"use client";

import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { getItemFromLocalStorage } from "../utils/helper";
import { GoBell } from "react-icons/go";

interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Navbar({ open, setOpen }: NavbarProps) {
  const { email } = getItemFromLocalStorage("auth") || {};

  return (
    <nav className="w-full text h-20 p-4 flex items-center justify-between border-b border-gray-600">
      {/* Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <RxHamburgerMenu size={24} />
        </div>

        <Link href="/" className="flex items-center">
          {/* Desktop logo */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/maglo.svg"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="bg-white rounded-lg"
                />
                <span className="text-xl font-semibold">Maglo</span>
              </div>
            </div>
          </div>

          {/* Mobile logo */}
          <div className="md:hidden">
            <svg width="30" height="32" viewBox="0 0 30 32" fill="currentColor">
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15..." />
            </svg>
          </div>
        </Link>
      </div>

      {/* Right menu */}
      <div className="flex items-center gap-2">
        <div>
          <GoBell className="custom-border-gray p-1" size={34} />
        </div>

        <div className="w-8 h-8 min-w-8 min-h-8 rounded-lg flex items-center justify-center overflow-hidden">
          {email ? (
            <div className="w-full h-full bg-primary text-black flex items-center justify-center text-2xl font-bold">
              {email?.charAt(0)?.toUpperCase() || "?"}
            </div>
          ) : (
            <div className="w-full h-full bg-primary text flex items-center justify-center text-2xl font-bold">
              ?
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
