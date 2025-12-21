import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ThemesProvider } from "../Providers/ThemesProvider";
import "./globals.css";
import { SidebarProvider } from "@/Providers/SideBarContext";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Pass Book System",
  description: "Get the cash insight here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <SidebarProvider>
          <ThemesProvider>{children}</ThemesProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
