"use client"

import * as React from "react"
import {
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Tv,
    User,
} from "lucide-react"

import { NavbarProps } from '@/lib/types';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { logout } from "@/service/logout"
import { toast } from "sonner"

function getDashboardHref(role?: string) {
    return role === "ADMIN" ? "/admin-dashboard" : role === "AUTHOR" ? "/author-dashboard" : "/dashboard"
}

export function Navbar({ user }: NavbarProps) {
    // const dashboardHref = user.data?.role === 'ADMIN' ? "/admin-dashboard" : user.data?.role === 'AUTHOR' ? '/author-dashboard' : '/dashboard';
    // console.log(user);

    const navItems = [
        { label: "Dashboard", href: getDashboardHref(user.data?.role) },
        { label: "Posts", href: "/posts" },
        { label: "Subscription", href: "/payment" },
    ]

    const [open, setOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-16 max-w-11/12 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Left: Logo / Text */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Tv className="size-5" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight">Prisma Press</span>
                    </Link>
                </div>

                {/* Middle: Navigation buttons (desktop) */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Button key={item.label} variant="ghost" size="sm" asChild>
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </nav>

                {/* Right: Profile dropdown + mobile menu */}
                <div className="flex items-center gap-2">
                    <ProfileMenu user={user} />

                    {/* Mobile hamburger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-4">
                                {navItems.map((item) => (
                                    <Button
                                        key={item.label}
                                        variant="ghost"
                                        className="justify-start"
                                        asChild
                                        onClick={() => setOpen(false)}
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </Button>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

const handleLogout = async () => {
    // console.log("Clicked")
    await logout()
    toast.success("Successfully Logged out.")
}

function ProfileMenu({ user }: NavbarProps) {
    if (!user.data) {
        return (
            <Button>
                <Link href={'/auth/login'}>Login</Link>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open profile menu">
                    <Avatar className="size-8">
                        <AvatarImage src="" alt="User avatar" />
                        <AvatarFallback>EX</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{user.data.role}</span>
                            <span className="text-xs font-normal text-muted-foreground">
                                {user.data.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <Link href='/profile'>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LayoutDashboard />
                        <Link href={getDashboardHref(user.data?.role)}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => handleLogout()}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}