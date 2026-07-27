import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';
import { getMe } from '@/service/getMe';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getMe()

    return (
        <div className="min-h-screen">
            <SidebarProvider
                style={{
                    "--sidebar-width": "15rem",
                } as React.CSSProperties}>
                <AppSidebar user={user} />
                <main className="w-full">
                    <SidebarTrigger />
                    <div className="">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}