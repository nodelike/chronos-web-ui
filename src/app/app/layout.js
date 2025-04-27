"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleSidebarCollapseChange = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    return (
        <div className="flex h-screen bg-chBgPrimary overflow-hidden">
            <Sidebar onCollapseChange={handleSidebarCollapseChange} />

            <div
                className={`flex-grow transition-all duration-300 overflow-auto
                     ${isSidebarCollapsed ? "md:pl-20" : "md:pl-64"}`}>
                {/* Main content */}
                <main className="p-6">
                    <div className="container mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
