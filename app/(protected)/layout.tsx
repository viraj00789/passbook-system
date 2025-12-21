"use client";
import { ThemesProvider } from "@/Providers/ThemesProvider";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { SidebarProvider } from "@/Providers/SideBarContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ThemesProvider>
        <AuthGuard>
          <div className="w-full h-screen flex flex-col bg-gray-100 dark:bg-dark-blue border-b border-gray-200 dark:border-gray-600">
            <Navbar />
            <div className="flex grow">
              <Sidebar />
              <div className="grow">{children}</div>
            </div>
          </div>
        </AuthGuard>
      </ThemesProvider>
    </SidebarProvider>
  );
}
