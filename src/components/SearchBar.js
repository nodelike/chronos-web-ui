"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ onOpenModal }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="flex-1 max-w-3xl pl-5 pr-3 flex items-center gap-2 rounded-full bg-chBgSecondary/80 backdrop-blur-md shadow-lg border border-chBorder group">
            <MagnifyingGlassIcon className="h-5 w-5 text-chTextSecondary" />
            <form onSubmit={handleSearch} className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 pr-4 bg-transparent text-chTextPrimary outline-none group-focus:border-ctaPrimary"
                />
            </form>
            <button
                onClick={onOpenModal}
                className="rounded-full flex items-center gap-2 bg-ctaPrimary py-1.5 px-8 text-white hover:bg-opacity-90 transition-all"
                aria-label="Add new item">
                <PlusIcon className="h-5 w-5" /> Add
            </button>
        </div>
    );
}
