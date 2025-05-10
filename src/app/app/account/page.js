"use client";

import { useState } from "react";
import { UserIcon, EnvelopeIcon, KeyIcon, BellIcon, CogIcon, ArrowRightOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "@/services/auth";

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    // Mock user data
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: null,
        joinDate: "May 2023",
    };

    const handleSignOut = () => {
        setShowSignOutModal(true);
    };

    const confirmSignOut = () => {
        logout();
    };

    const closeSignOutModal = () => {
        setShowSignOutModal(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-chTextPrimary mb-2">Account Settings</h1>
                <p className="text-chTextSecondary">Manage your personal information and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-chBgSecondary rounded-xl p-6 border border-chBorder shadow-sm">
                        <div className="flex flex-col items-center mb-6">
                            <div className="h-24 w-24 rounded-full bg-gray-300 overflow-hidden mb-4 border-2 border-ctaPrimary">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-ctaPrimary/20">
                                        <UserIcon className="h-12 w-12 text-ctaPrimary" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-lg font-semibold text-chTextPrimary">{user.name}</h2>
                            <p className="text-sm text-chTextSecondary">Member since {user.joinDate}</p>
                        </div>

                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                                    activeTab === "profile" ? "bg-ctaPrimary text-white" : "text-chTextPrimary hover:bg-chBgPrimary"
                                }`}>
                                <UserIcon className="h-5 w-5 mr-3" />
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                                    activeTab === "security" ? "bg-ctaPrimary text-white" : "text-chTextPrimary hover:bg-chBgPrimary"
                                }`}>
                                <KeyIcon className="h-5 w-5 mr-3" />
                                Security
                            </button>
                            <button
                                onClick={() => setActiveTab("notifications")}
                                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                                    activeTab === "notifications" ? "bg-ctaPrimary text-white" : "text-chTextPrimary hover:bg-chBgPrimary"
                                }`}>
                                <BellIcon className="h-5 w-5 mr-3" />
                                Notifications
                            </button>
                            <button
                                onClick={() => setActiveTab("preferences")}
                                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                                    activeTab === "preferences" ? "bg-ctaPrimary text-white" : "text-chTextPrimary hover:bg-chBgPrimary"
                                }`}>
                                <CogIcon className="h-5 w-5 mr-3" />
                                Preferences
                            </button>

                            {/* Sign Out Button */}
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50">
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                                Sign Out
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <div className="bg-chBgSecondary rounded-xl p-6 border border-chBorder shadow-sm">
                        {activeTab === "profile" && (
                            <div>
                                <h2 className="text-xl font-semibold text-chTextPrimary mb-4">Profile Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-chTextSecondary mb-1">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <UserIcon className="h-5 w-5 text-chTextSecondary" />
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                defaultValue={user.name}
                                                className="pl-10 block w-full rounded-md border border-chBorder py-2 px-3 bg-chBgPrimary text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-chTextSecondary mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <EnvelopeIcon className="h-5 w-5 text-chTextSecondary" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                defaultValue={user.email}
                                                className="pl-10 block w-full rounded-md border border-chBorder py-2 px-3 bg-chBgPrimary text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-chTextSecondary mb-1">Profile Picture</label>
                                        <div className="flex items-center mt-2">
                                            <div className="h-16 w-16 rounded-full bg-gray-300 overflow-hidden mr-4 border border-chBorder">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-ctaPrimary/20">
                                                        <UserIcon className="h-8 w-8 text-ctaPrimary" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <button className="bg-chBgPrimary border border-chBorder text-chTextPrimary px-3 py-1.5 rounded-md text-sm hover:bg-chBgPrimary/80">
                                                    Upload New Picture
                                                </button>
                                                {user.avatar && <button className="ml-2 text-red-500 text-sm hover:text-red-600">Remove</button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-chBorder flex justify-end">
                                    <button className="bg-ctaPrimary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div>
                                <h2 className="text-xl font-semibold text-chTextPrimary mb-4">Security Settings</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-chTextPrimary mb-2">Change Password</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label htmlFor="current-password" className="block text-sm font-medium text-chTextSecondary mb-1">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="current-password"
                                                    className="block w-full rounded-md border border-chBorder py-2 px-3 bg-chBgPrimary text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="new-password" className="block text-sm font-medium text-chTextSecondary mb-1">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="new-password"
                                                    className="block w-full rounded-md border border-chBorder py-2 px-3 bg-chBgPrimary text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="confirm-password" className="block text-sm font-medium text-chTextSecondary mb-1">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="confirm-password"
                                                    className="block w-full rounded-md border border-chBorder py-2 px-3 bg-chBgPrimary text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-chBorder flex justify-end">
                                    <button className="bg-ctaPrimary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div>
                                <h2 className="text-xl font-semibold text-chTextPrimary mb-4">Notification Preferences</h2>
                                <p className="text-chTextSecondary mb-6">Choose how you want to be notified about activities and updates</p>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-chBorder">
                                        <div>
                                            <h3 className="text-chTextPrimary font-medium">Email Notifications</h3>
                                            <p className="text-sm text-chTextSecondary">Receive email notifications for important updates</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ctaPrimary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-chBorder">
                                        <div>
                                            <h3 className="text-chTextPrimary font-medium">Task Reminders</h3>
                                            <p className="text-sm text-chTextSecondary">Get notified about upcoming tasks and deadlines</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ctaPrimary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-chBorder">
                                        <div>
                                            <h3 className="text-chTextPrimary font-medium">New Features</h3>
                                            <p className="text-sm text-chTextSecondary">Learn about new features and updates</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ctaPrimary"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-chBorder flex justify-end">
                                    <button className="bg-ctaPrimary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div>
                                <h2 className="text-xl font-semibold text-chTextPrimary mb-4">Account Preferences</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-chBorder">
                                        <div>
                                            <h3 className="text-chTextPrimary font-medium">Language</h3>
                                            <p className="text-sm text-chTextSecondary">Choose your preferred language</p>
                                        </div>
                                        <select className="bg-chBgPrimary border border-chBorder text-chTextPrimary rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-ctaPrimary">
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                            <option value="fr">Français</option>
                                            <option value="de">Deutsch</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-chBorder">
                                        <div>
                                            <h3 className="text-chTextPrimary font-medium">Default View</h3>
                                            <p className="text-sm text-chTextSecondary">Choose the default view for storage items</p>
                                        </div>
                                        <select className="bg-chBgPrimary border border-chBorder text-chTextPrimary rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-ctaPrimary">
                                            <option value="grid">Grid</option>
                                            <option value="list">List</option>
                                            <option value="kanban">Kanban</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-10 pt-4 border-t border-chBorder">
                                    <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-chTextSecondary mb-4">
                                        Permanently delete your account and all of your content from the platform.
                                    </p>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sign Out Confirmation Modal */}
            {showSignOutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-chBgSecondary rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-chBorder">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-chTextPrimary">Sign Out</h3>
                            <button onClick={closeSignOutModal} className="text-chTextSecondary hover:text-chTextPrimary">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <p className="text-chTextSecondary mb-6">Are you sure you want to sign out?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeSignOutModal}
                                className="px-4 py-2 bg-chBgPrimary text-chTextPrimary border border-chBorder rounded-md hover:bg-chBgPrimary/80">
                                Cancel
                            </button>
                            <button onClick={confirmSignOut} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
