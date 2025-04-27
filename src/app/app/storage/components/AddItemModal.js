import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StorageItemTypes } from "@/services/choices";
import PhotoUploader from "./PhotoUploader";
import DocumentUploader from "./DocumentUploader";
import { uploadFile } from "@/services/storageItem";

const AddItemModal = ({ isOpen, onClose, onItemAdded, initialItemType = StorageItemTypes.NOTE, initialFile = null }) => {
    const [selectedItemType, setSelectedItemType] = useState(initialItemType);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [documentTitle, setDocumentTitle] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [itemTitle, setItemTitle] = useState("");

    useEffect(() => {
        if (initialFile) {
            setUploadedFile(initialFile);
        }
    }, [initialFile]);

    useEffect(() => {
        setSelectedItemType(initialItemType);
    }, [initialItemType]);

    const handleItemTypeChange = (e) => {
        setSelectedItemType(e.target.value);
        // Reset upload states when changing item type
        setUploadedFile(null);
        setErrorMessage("");
    };

    const handleFileSelect = (file) => {
        setUploadedFile(file);
        setErrorMessage("");
    };

    const handleError = (error) => {
        setErrorMessage(error);
    };

    const handleTitleChange = (title) => {
        setDocumentTitle(title);
    };

    const handleItemTitleChange = (e) => {
        setItemTitle(e.target.value);
    };

    const handleSubmit = async () => {
        if (selectedItemType === StorageItemTypes.PHOTO && uploadedFile) {
            await uploadItem(uploadedFile);
        } else if (selectedItemType === StorageItemTypes.DOCUMENT && uploadedFile) {
            await uploadItem(uploadedFile);
        } else if (itemTitle) {
            // Handle other item types
            onClose();
            if (onItemAdded) onItemAdded();
        } else {
            onClose();
        }
    };

    const uploadItem = async (file) => {
        setIsUploading(true);
        setUploadProgress(0);
        
        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 300);
            
            // Upload the file
            await uploadFile(file);
            
            // Complete the progress bar
            clearInterval(progressInterval);
            setUploadProgress(100);
            
            // Notify parent of successful upload
            if (onItemAdded) onItemAdded();
            
            // Clear and close modal
            setTimeout(() => {
                setIsUploading(false);
                setUploadedFile(null);
                onClose();
            }, 500);
        } catch (error) {
            console.error("Error uploading file:", error);
            setErrorMessage("Failed to upload file. Please try again.");
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-chBgSecondary rounded-xl p-6 max-w-md w-full shadow-xl border border-chBorder">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-chTextPrimary">Add New Item</h2>
                    <button onClick={onClose} className="text-chTextSecondary hover:text-chTextPrimary">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-chTextPrimary">Item Type</label>
                        <select 
                            className="w-full rounded-md border border-chBorder bg-chBgPrimary px-3 py-2 text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                            value={selectedItemType}
                            onChange={handleItemTypeChange}>
                            {Object.values(StorageItemTypes).map((type) => (
                                <option key={`${type}-option`} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {selectedItemType === StorageItemTypes.PHOTO ? (
                        <PhotoUploader 
                            onFileSelect={handleFileSelect} 
                            onError={handleError}
                            initialFile={uploadedFile} 
                        />
                    ) : selectedItemType === StorageItemTypes.DOCUMENT ? (
                        <DocumentUploader 
                            onFileSelect={handleFileSelect}
                            onTitleChange={handleTitleChange}
                            initialFile={uploadedFile}
                            initialTitle={documentTitle}
                        />
                    ) : (
                        // Default title field for other item types
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-chTextPrimary">Title</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-chBorder bg-chBgPrimary px-3 py-2 text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                                placeholder="Enter title"
                                value={itemTitle}
                                onChange={handleItemTitleChange}
                            />
                        </div>
                    )}
                    
                    <div className="pt-4 flex justify-end gap-2">
                        <button onClick={onClose} className="px-4 py-2 border border-chBorder rounded-md text-chTextPrimary hover:bg-chBgPrimary">
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={
                                (selectedItemType === StorageItemTypes.PHOTO && !uploadedFile) ||
                                (selectedItemType === StorageItemTypes.DOCUMENT && !uploadedFile)
                            }
                            className={`px-4 py-2 rounded-md ${
                                (selectedItemType === StorageItemTypes.PHOTO && !uploadedFile) ||
                                (selectedItemType === StorageItemTypes.DOCUMENT && !uploadedFile)
                                    ? "bg-ctaPrimary/50 text-white/80 cursor-not-allowed"
                                    : "bg-ctaPrimary text-white hover:bg-opacity-90"
                            }`}>
                            {isUploading ? "Uploading..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItemModal; 