'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation';
import { sideBarMenu } from './../app/(private routes)/(dashboard group)/_config/sideBarMenu';
import { NavbarProps } from '@/lib/types';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// const navMain = [
//     { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { title: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
//     { title: "Technicians", href: "/dashboard/technicians", icon: Wrench },
//     { title: "Customers", href: "/dashboard/customers", icon: Users },
//     { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
// ]

export function AppSidebar({ user }: NavbarProps) {
    const pathname = usePathname()
    // console.log(user);
    // const navMain = sideBarMenu.USER
    let navMain = []
    
    if (user.data?.role === 'ADMIN') {
        navMain = sideBarMenu.ADMIN
    }
    else if (user.data?.role === 'AUTHOR') {
        navMain = sideBarMenu.AUTHOR
    }
    else {
        navMain = sideBarMenu.USER
    }

    return (
        <Sidebar>
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContent className="mt-10">
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user.data?.role}</div>
                    <div className="text-xs text-muted-foreground">{user.data?.email}</div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}