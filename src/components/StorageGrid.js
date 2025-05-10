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
import PhotoCard from "@/app/app/storage/components/PhotoCard";
import { StorageItemTypes } from "@/services/choices";
import { getStorageItems, getPersonStorageItems } from "@/services/storageItem";
import FileDragDropHandler from "@/components/FileDragDropHandler";
import AddItemModal from "@/app/app/storage/components/AddItemModal";

/**
 * A reusable grid component for displaying storage items
 * Can be used for general storage view or for a specific person's storage items
 */
const StorageGrid = ({ personId = null, showFilters = true, showSearch = false, enableDragDrop = true }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [droppedFile, setDroppedFile] = useState(null);
    const [modalItemType, setModalItemType] = useState(StorageItemTypes.NOTE);

    const fetchItems = async () => {
        try {
            setLoading(true);
            let response;

            if (personId) {
                // Fetch storage items for a specific person
                response = await getPersonStorageItems(personId);
            } else {
                // Fetch all storage items
                response = await getStorageItems();
            }

            setItems(response?.data?.items || []);
            setError(null);
        } catch (error) {
            console.error("Error fetching storage items:", error);
            setError("Failed to load storage items. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [personId]);

    const filteredItems = filter === "all" ? items : items.filter((item) => item.type === filter);

    const openModal = (initialType = StorageItemTypes.NOTE) => {
        setModalItemType(initialType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDroppedFile(null);
    };

    const handleGlobalFileDrop = (file, fileType) => {
        // Determine which modal to open based on file type
        if (fileType === "photo") {
            setModalItemType(StorageItemTypes.PHOTO);
        } else if (fileType === "document") {
            setModalItemType(StorageItemTypes.DOCUMENT);
        }

        setDroppedFile(file);
        setIsModalOpen(true);
    };

    const handleItemAdded = () => {
        // Refresh the list after an item is added
        fetchItems();
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
                                <h3 className="font-medium text-chTextPrimary line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-chTextSecondary hover:text-chTextPrimary">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <p className="text-sm text-chTextSecondary line-clamp-3">{item.content}</p>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-chTextSecondary mt-2 pt-2 border-t border-chBorder">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-ctaPrimary" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-ctaSecondary" title="Delete">
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
                                <h3 className="font-medium text-chTextPrimary line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-chTextSecondary hover:text-chTextPrimary">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="space-y-2">
                                <p className="text-sm text-chTextSecondary line-clamp-2">{item.content}</p>
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
                        <div className="flex justify-between items-center text-xs text-chTextSecondary mt-2 pt-2 border-t border-chBorder">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-ctaPrimary" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-ctaSecondary" title="Delete">
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
                                <h3 className="font-medium text-chTextPrimary line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-chTextSecondary hover:text-chTextPrimary">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="space-y-2">
                                <p className="text-sm text-chTextSecondary line-clamp-2">{item.description}</p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ctaPrimary hover:underline text-sm block truncate">
                                    {item.url}
                                </a>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-chTextSecondary mt-2 pt-2 border-t border-chBorder">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-ctaPrimary" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-ctaSecondary" title="Delete">
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
                                <h3 className="font-medium text-chTextPrimary line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-chTextSecondary hover:text-chTextPrimary">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="flex items-center justify-between mt-2 text-sm">
                                <span className="text-chTextSecondary">{item.fileType}</span>
                                <span className="text-chTextSecondary">{item.size}</span>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-chTextSecondary mt-2 pt-2 border-t border-chBorder">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-ctaPrimary" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-ctaSecondary" title="Delete">
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
                                <h3 className="font-medium text-chTextPrimary line-clamp-1">{item.title}</h3>
                            </div>
                            <button className="text-chTextSecondary hover:text-chTextPrimary">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Card Content */}
                        <div className="mb-3">
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-chTextSecondary">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    <span>{item.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-chTextSecondary">
                                    <span className="font-medium">{item.time}</span>
                                    <span className="mx-1">•</span>
                                    <span>{item.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center text-xs text-chTextSecondary mt-2 pt-2 border-t border-chBorder">
                            <span>{item.date}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-ctaPrimary" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-ctaSecondary" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case StorageItemTypes.PHOTO:
                return <PhotoCard key={item.id} item={item} refetchItems={fetchItems} />;

            default:
                return (
                    <div key={item.id} className={`rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                                <h3 className="font-medium text-chTextPrimary line-clamp-1">{item.fileName || item.title}</h3>
                            </div>
                            <button className="text-chTextSecondary hover:text-chTextPrimary">
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center text-xs text-chTextSecondary mt-2 pt-2 border-t border-chBorder">
                            <span>{item.date || new Date(item.createdAt).toLocaleDateString()}</span>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:text-ctaPrimary" title="Favorite">
                                    <StarIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:text-ctaSecondary" title="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ctaPrimary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-ctaSecondary">
                <p>{error}</p>
                <button onClick={fetchItems} className="mt-4 px-4 py-2 bg-ctaPrimary text-white rounded-md hover:opacity-90">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Global file drag-and-drop handler - only if enabled */}
            {enableDragDrop && <FileDragDropHandler onFileDrop={handleGlobalFileDrop} />}

            {/* Add Item Modal */}
            <AddItemModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onItemAdded={handleItemAdded}
                initialItemType={modalItemType}
                initialFile={droppedFile}
                personId={personId}
            />

            {/* Filter Tabs - only if showFilters is true */}
            {showFilters && (
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
                                filter === StorageItemTypes[type]
                                    ? "bg-ctaPrimary text-white"
                                    : "bg-chBgSecondary text-chTextPrimary border border-chBorder"
                            }`}>
                            {type}
                        </button>
                    ))}
                </div>
            )}

            {/* Pinterest-like Grid Layout */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">{filteredItems.map(renderCard)}</div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-chTextSecondary">No items found.</p>
                    {!personId && <p className="text-chTextSecondary mt-2">Add some new content!</p>}
                </div>
            )}
        </div>
    );
};

export default StorageGrid;
