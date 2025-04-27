"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, PlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "@/components/ThemeToggle";

export default function AppLayout({ children }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-chBgPrimary">
            {/* Floating Navbar */}
            <nav className="fixed top-5 left-5 right-5 container mx-auto z-10 flex items-center justify-center gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-chTextPrimary p-2 rounded-md hover:bg-chBgPrimary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl pl-5 pr-3 flex items-center gap-2 rounded-full bg-chBgSecondary/80 backdrop-blur-md shadow-lg border border-chBorder/30 group">
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
                        onClick={openModal}
                        className="rounded-full flex items-center gap-2 bg-ctaPrimary py-1.5 px-8 text-white hover:bg-opacity-90 transition-all"
                        aria-label="Add new item">
                        <PlusIcon className="h-5 w-5" /> Add
                    </button>
                </div>

                {/* Right Side Elements */}
                <button
                    onClick={() => router.push("/app/account")}
                    className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden border-2 border-ctaPrimary hover:opacity-90 transition-all">
                    <img
                        src="/images/profile-placeholder.jpg"
                        alt="Profile"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CCCCCC'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                        }}
                    />
                </button>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-[73px] left-5 right-5 z-10 bg-chBgSecondary/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-chBorder/30 md:hidden">
                    <ul className="space-y-3">
                        <li>
                            <Link href="/app" className="block py-2 px-3 text-chTextPrimary hover:bg-chBgPrimary rounded-md">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/app/account" className="block py-2 px-3 text-chTextPrimary hover:bg-chBgPrimary rounded-md">
                                Account
                            </Link>
                        </li>
                        <li>
                            <Link href="/app/settings" className="block py-2 px-3 text-chTextPrimary hover:bg-chBgPrimary rounded-md">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            )}

            {/* Add Item Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-chBgSecondary rounded-xl p-6 max-w-md w-full shadow-xl border border-chBorder">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-chTextPrimary">Add New Item</h2>
                            <button onClick={closeModal} className="text-chTextSecondary hover:text-chTextPrimary">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {/* Modal content here */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-chTextPrimary">Item Type</label>
                                <select className="w-full rounded-md border border-chBorder bg-chBgPrimary px-3 py-2 text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary">
                                    <option value="note">Note</option>
                                    <option value="task">Task</option>
                                    <option value="file">File</option>
                                    <option value="link">Link</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-chTextPrimary">Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-chBorder bg-chBgPrimary px-3 py-2 text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-2">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-chBorder rounded-md text-chTextPrimary hover:bg-chBgPrimary">
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-ctaPrimary text-white rounded-md hover:bg-opacity-90">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content with top padding for navbar */}
            <main className="pt-28 pb-6 px-4 container mx-auto">{children}</main>
        </div>
    );
}
