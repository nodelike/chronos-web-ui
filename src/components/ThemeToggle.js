"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10"></div>; // Placeholder to prevent layout shift
    }

    return (
        <button
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-md transition-colors text-chTextPrimary"
            onClick={toggleTheme}>
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
    );
}
