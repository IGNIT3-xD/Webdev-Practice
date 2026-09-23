"use client";

import * as React from "react";
import {
  Hospital,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "#" },
  { label: "Team", href: "#" },
  { label: "Reports", href: "#" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-11/12 items-center justify-between gap-4">
        {/* Left: Logo / Text */}
        <div className="flex items-center gap-6">
          <Link href="#" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Hospital className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              PH Healthcare
            </span>
          </Link>
        </div>

        {/* Middle: Navigation buttons (desktop) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Right: Profile dropdown + mobile menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProfileMenu />

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
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
  );
}

function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Open profile menu"
        >
          <Avatar className="size-8">
            <AvatarImage src="/thoughtful-artist.png" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Jane Doe
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                jane@acme.com
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
