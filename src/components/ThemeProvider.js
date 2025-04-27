"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{mounted && children}</ThemeContext.Provider>;
}
