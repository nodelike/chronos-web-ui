"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import StorageGrid from "@/components/StorageGrid";
import AddItemModal from "@/app/app/storage/components/AddItemModal";
import { StorageItemTypes } from "@/services/choices";

export default function StoragePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleItemAdded = () => {
        // Force StorageGrid to refresh by updating the key
        setShouldRefresh((prev) => !prev);
    };

    return (
        <>
            {/* Search Bar - Only visible on Storage page */}
            <div className="sticky top-0 z-10 -mt-6 -mx-6 pt-5 px-5 pb-3 bg-chBgPrimary">
                <SearchBar onOpenModal={openModal} />
            </div>

            <div className="mt-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-chTextPrimary mb-2">My Storage</h1>
                    <p className="text-chTextSecondary">Organize and access your digital content</p>
                </div>

                {/* Storage Grid Component - Using key to force refresh */}
                <StorageGrid key={shouldRefresh} showFilters={true} enableDragDrop={true} />
            </div>

            {/* Add Item Modal */}
            <AddItemModal isOpen={isModalOpen} onClose={closeModal} onItemAdded={handleItemAdded} initialItemType={StorageItemTypes.NOTE} />
        </>
    );
}
