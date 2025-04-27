import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-1 p-8 pb-20 gap-8 sm:p-12">
                <main className="max-w-5xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-3xl font-bold mb-4">Welcome to Chronos</h1>
                        <p className="text-gray-600 dark:text-gray-400">This is to be a landing page for the app and needs to be implemented</p>
                    </header>

                </main>
            </div>

            <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                <p>© {new Date().getFullYear()} Chronos. All rights reserved.</p>
            </footer>
        </div>
    );
}
