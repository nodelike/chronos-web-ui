"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="border-b border-chBorder sticky top-0 z-40 w-full bg-chBgSecondary">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center font-bold font-accent text-chTextPrimary text-2xl uppercase tracking-widest">
            Chronos
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 