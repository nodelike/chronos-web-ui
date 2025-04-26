import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-1 p-8 pb-20 gap-8 sm:p-12">
                <main className="max-w-5xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-3xl font-bold mb-4">Welcome to Chronos</h1>
                        <p className="text-gray-600 dark:text-gray-400">Your personal dashboard</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Dashboard Cards */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Welcome to your dashboard. This is a protected page that requires authentication.
                            </p>
                            <div className="flex justify-end">
                                <a
                                    href="https://nextjs.org/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                                    Learn More →
                                </a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">Profile</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your profile settings and account preferences here.</p>
                            <div className="flex justify-end">
                                <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                                    View Profile →
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">View your analytics and usage statistics for your account.</p>
                            <div className="flex justify-end">
                                <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                                    View Analytics →
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                <p>© {new Date().getFullYear()} Chronos. All rights reserved.</p>
            </footer>
        </div>
    );
}
