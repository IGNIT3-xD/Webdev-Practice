import { LayoutDashboard, Mail } from "lucide-react"

const USER_SIDEBAR = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Post", href: "/dashboard/my-post", icon: Mail }
]

const AUTHOR_SIDEBAR = [
    { title: "Dashboard", href: "/author-dashboard", icon: LayoutDashboard },
    { title: "My Post", href: "/author-dashboard/my-post", icon: Mail }
]

const ADMIN_SIDEBAR = [
    { title: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { title: "My Post", href: "/admin-dashboard/my-post", icon: Mail }
]

export const sideBarMenu = {
    USER: USER_SIDEBAR,
    AUTHOR: AUTHOR_SIDEBAR,
    ADMIN: ADMIN_SIDEBAR
}