import AuthGuard from "@/components/AuthGuard";
import { ThemesProvider } from "@/Providers/ThemesProvider";
import "../globals.css"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemesProvider><AuthGuard>{children}</AuthGuard></ThemesProvider>
    )
}