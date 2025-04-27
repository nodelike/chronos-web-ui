"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    MapPinIcon,
    UserGroupIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar({ onCollapseChange }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const routes = [
        { name: "Storage", path: "/app", icon: HomeIcon },
        { name: "Chronicles", path: "/app/chronicles", icon: BookOpenIcon },
        { name: "Chat", path: "/app/chat", icon: ChatBubbleLeftRightIcon },
        { name: "Location", path: "/app/location", icon: MapPinIcon },
        { name: "People", path: "/app/people", icon: UserGroupIcon },
        { name: "Account", path: "/app/account", icon: UserCircleIcon },
    ];

    // Notify parent component when collapsed state changes
    useEffect(() => {
        if (onCollapseChange) {
            onCollapseChange(collapsed);
        }
    }, [collapsed, onCollapseChange]);

    const isActive = (path) => {
        if (path === "/app" && pathname === "/app") {
            return true;
        }
        return path !== "/app" && pathname.startsWith(path);
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden fixed top-5 left-5 z-50 w-10 h-10 rounded-md bg-chBgSecondary flex items-center justify-center shadow-md border border-chBorder/30">
                {mobileOpen ? <XMarkIcon className="h-6 w-6 text-chTextPrimary" /> : <Bars3Icon className="h-6 w-6 text-chTextPrimary" />}
            </button>

            {/* Sidebar for desktop */}
            <div
                className={`fixed left-0 top-0 h-full bg-chBgSecondary border-r border-chBorder/30 shadow-xl transition-all duration-300 z-40 hidden md:block
                    ${collapsed ? "w-20" : "w-64"}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div
                        className={`flex items-center justify-between px-5 py-6 border-b border-chBorder/30
                        ${collapsed ? "justify-center px-2" : ""}`}>
                        {!collapsed && <h1 className="text-xl font-accent font-bold uppercase tracking-widest text-chTextPrimary">Chronos</h1>}
                        <button onClick={toggleCollapse} className="rounded-md p-1.5 hover:bg-chBgPrimary text-chTextSecondary">
                            {collapsed ? <ChevronDoubleRightIcon className="h-5 w-5" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-5 px-3">
                        <ul className="space-y-1">
                            {routes.map((route) => (
                                <li key={route.path}>
                                    <Link
                                        href={route.path}
                                        className={`flex items-center rounded-xl py-3 px-4 text-sm font-medium transition-colors
                                            ${
                                                isActive(route.path)
                                                    ? "bg-ctaPrimary/10 text-ctaPrimary"
                                                    : "text-chTextPrimary hover:bg-chBgPrimary hover:text-chTextPrimary"
                                            }
                                            ${collapsed ? "justify-center px-2" : ""}`}>
                                        <route.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                                        {!collapsed && <span>{route.name}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Bottom Section with Theme Toggle */}
                    <div
                        className={`py-5 px-4 border-t border-chBorder/30 
                        ${collapsed ? "flex justify-center" : "flex items-center justify-between"}`}>
                        {!collapsed && <span className="text-sm font-medium text-chTextSecondary">Theme</span>}
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar (overlay) */}
            <div className={`fixed inset-0 bg-black/50 z-30 md:hidden ${mobileOpen ? "block" : "hidden"}`} onClick={() => setMobileOpen(false)} />

            <div
                className={`fixed left-0 top-0 h-full w-64 bg-chBgSecondary border-r border-chBorder/30 shadow-xl z-40 transition-transform duration-300 md:hidden
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between px-5 py-6 border-b border-chBorder/30">
                        <h1 className="text-xl font-bold text-chTextPrimary">Chronos</h1>
                        <button onClick={() => setMobileOpen(false)} className="rounded-md p-1.5 hover:bg-chBgPrimary text-chTextSecondary">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-5 px-3">
                        <ul className="space-y-1">
                            {routes.map((route) => (
                                <li key={route.path}>
                                    <Link
                                        href={route.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center rounded-xl py-3 px-4 text-sm font-medium transition-colors
                                            ${
                                                isActive(route.path)
                                                    ? "bg-ctaPrimary/10 text-ctaPrimary"
                                                    : "text-chTextPrimary hover:bg-chBgPrimary hover:text-chTextPrimary"
                                            }`}>
                                        <route.icon className="h-5 w-5 mr-3" />
                                        <span>{route.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Bottom Section with Theme Toggle */}
                    <div className="py-5 px-4 border-t border-chBorder/30 flex items-center justify-between">
                        <span className="text-sm font-medium text-chTextSecondary">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </>
    );
}
