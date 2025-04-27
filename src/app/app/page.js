"use client";

import { useState, useEffect } from "react";
import {
    DocumentTextIcon,
    CheckCircleIcon,
    LinkIcon,
    DocumentIcon,
    CalendarIcon,
    PhotoIcon,
    StarIcon,
    TrashIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import { getStorageItems } from "@/services/storageItem";
import PhotoCard from "./storage/components/PhotoCard";
import { StorageItemTypes } from "@/services/choices";

export default function StoragePage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchStorageItems = async () => {
            try {
                const response = await getStorageItems();
                setItems(response?.data?.items);
            } catch (error) {
                console.error("Error fetching storage items:", error);
            }
        };

        fetchStorageItems();
    }, []);

    const filteredItems = filter === "all" ? items : items.filter((item) => item.type === filter);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Render different card types based on item type
    const renderCard = (item) => {
        switch (item.type) {
            case StorageItemTypes.NOTE:
                return (
                    <div
                        key={item.id}
                        className={`rounded-xl p-4 border ${item.color} shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <p className="text-sm text-gray-700 line-clamp-3">{item.content}</p>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-yellow-500" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-red-500" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case StorageItemTypes.TASK:
                return (
                    <div
                        key={item.id}
                        className={`rounded-xl p-4 border ${item.color} shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-700 line-clamp-2">{item.content}</p>
                                <div className="flex justify-between text-xs">
                                    <span
                                        className={`px-2 py-1 rounded ${
                                            item.completed ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                                        }`}>
                                        {item.completed ? "Completed" : item.dueDate}
                                    </span>
                                    {!item.completed && <span className="px-2 py-1 rounded bg-red-200 text-red-800">{item.priority}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-yellow-500" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-red-500" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case StorageItemTypes.LINK:
                return (
                    <div
                        key={item.id}
                        className={`rounded-xl p-4 border ${item.color} shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm block truncate">
                                    {item.url}
                                </a>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-yellow-500" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-red-500" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case StorageItemTypes.DOCUMENT:
                return (
                    <div
                        key={item.id}
                        className={`rounded-xl p-4 border ${item.color} shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="flex items-center justify-between mt-2 text-sm">
                                <span className="text-gray-700">{item.fileType}</span>
                                <span className="text-gray-500">{item.size}</span>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-yellow-500" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-red-500" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case StorageItemTypes.EVENT:
                return (
                    <div
                        key={item.id}
                        className={`rounded-xl p-4 border ${item.color} shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-700">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    <span>{item.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <span className="font-medium">{item.time}</span>
                                    <span className="mx-1">•</span>
                                    <span>{item.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-yellow-500" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-red-500" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case StorageItemTypes.PHOTO:
                return <PhotoCard key={item.id} item={item} />;

            default:
                return (
                    <div key={item.id} className={`rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.fileName || item.title}</h3>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                            <span>{item.date || new Date(item.createdAt).toLocaleDateString()}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-yellow-500" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-red-500" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {/* Search Bar - Only visible on Storage page */}
            <div className="sticky top-0 z-10 -mt-6 -mx-6 pt-5 px-5 pb-3 bg-chBgPrimary">
                <SearchBar onOpenModal={openModal} />
            </div>

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
                                    {Object.values(StorageItemTypes).map((type) => (
                                        <option key={`${type}-option`} value={type}>
                                            {type}
                                        </option>
                                    ))}
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

            <div className="mt-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-chTextPrimary mb-2">My Storage</h1>
                    <p className="text-chTextSecondary">Organize and access your digital content</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-full text-sm ${
                            filter === "all" ? "bg-ctaPrimary text-white" : "bg-chBgSecondary text-chTextPrimary border border-chBorder"
                        }`}>
                        All Items
                    </button>
                    {Object.keys(StorageItemTypes).map((type) => (
                        <button
                            key={`${type}-button`}
                            onClick={() => setFilter(StorageItemTypes[type])}
                            className={`px-4 py-2 rounded-full text-sm lowercase first-letter:uppercase ${
                                filter === StorageItemTypes[type] ? "bg-ctaPrimary text-white" : "bg-chBgSecondary text-chTextPrimary border border-chBorder"
                            }`}>
                            {type}
                        </button>
                    ))}
                </div>

                {/* Pinterest-like Grid Layout */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">{filteredItems.map(renderCard)}</div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-chTextSecondary">No items found. Add some new content!</p>
                    </div>
                )}
            </div>
        </>
    );
}
