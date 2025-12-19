"use client";
import { ThemesProvider } from "@/Providers/ThemesProvider";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import "../globals.css";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <ThemesProvider>
      <AuthGuard>
        <div className="w-full h-screen flex flex-col bg-gray-100 dark:bg-dark-blue border-b border-gray-200 dark:border-gray-600">
          <Navbar open={open} setOpen={setOpen} />
          <div className="flex grow">
            <Sidebar open={open} setOpen={setOpen} />
            <div className="grow">{children}</div>
          </div>
        </div>
      </AuthGuard>
    </ThemesProvider>
  );
}
