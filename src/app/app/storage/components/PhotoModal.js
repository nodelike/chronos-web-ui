import React, { useState, useEffect } from "react";
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";
import { getStorageItemById } from "@/services/storageItem";

const PhotoModal = ({ itemId, isOpen, onClose }) => {
    const [photoDetails, setPhotoDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                setLoading(true);
                const response = await getStorageItemById(itemId);
                setPhotoDetails(response.data.storageItem);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching photo details:", err);
                setError("Failed to load photo details. Please try again.");
                setLoading(false);
            }
        };

        if (isOpen && itemId) {
            fetchPhotoDetails();
        }
        
        // Add escape key handler for closing modal
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        
        window.addEventListener('keydown', handleEscKey);
        
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, itemId, onClose]);

    // Prevent scroll on body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
                // Close modal when clicking outside content area
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={`relative bg-chBgSecondary rounded-xl shadow-2xl border border-chBorder ${isFullscreen ? 'w-full h-full max-w-none max-h-none rounded-none' : 'w-full max-w-5xl max-h-[90vh]'} overflow-hidden flex flex-col transition-all duration-300`}>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-chBorder">
                    <h2 className="text-xl font-bold text-chTextPrimary">
                        {loading ? "Loading..." : photoDetails?.fileName || "Photo Details"}
                    </h2>
                    <div className="flex items-center gap-2">
                        {!loading && photoDetails && (
                            <>
                                <button 
                                    className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                                    title="Download Image"
                                >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                                    title="Share Image"
                                >
                                    <ShareIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={toggleFullscreen}
                                    className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                                    title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        {isFullscreen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        )}
                                    </svg>
                                </button>
                            </>
                        )}
                        <button 
                            onClick={onClose} 
                            className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                            title="Close"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto p-4 flex-grow">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ctaPrimary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center py-10">{error}</div>
                    ) : (
                        <div className={`flex ${isFullscreen ? 'flex-col' : 'flex-col md:flex-row'} gap-6`}>
                            {/* Photo Display Section */}
                            <div className={`${isFullscreen ? 'w-full' : 'md:w-2/3'}`}>
                                <div className="rounded-lg overflow-hidden shadow-md">
                                    <img 
                                        src={photoDetails.uri} 
                                        alt={photoDetails.fileName} 
                                        className={`w-full ${isFullscreen ? 'max-h-[70vh] object-contain mx-auto' : 'h-auto object-contain'}`}
                                    />
                                </div>
                            </div>

                            {/* Metadata Section */}
                            <div className={`${isFullscreen ? 'w-full' : 'md:w-1/3'}`}>
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="bg-chBgPrimary/50 p-4 rounded-lg border border-chBorder">
                                        <h3 className="text-lg font-semibold mb-3 text-chTextPrimary">
                                            File Information
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-chTextSecondary">Name:</span>
                                                <span className="text-chTextPrimary font-medium">{photoDetails.fileName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-chTextSecondary">Size:</span>
                                                <span className="text-chTextPrimary font-medium">
                                                    {Math.round(photoDetails.fileSize / 1024)} KB
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-chTextSecondary">Type:</span>
                                                <span className="text-chTextPrimary font-medium">{photoDetails.mimeType}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-chTextSecondary">Created:</span>
                                                <span className="text-chTextPrimary font-medium">
                                                    {new Date(photoDetails.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-chTextSecondary">Source:</span>
                                                <span className="text-chTextPrimary font-medium">
                                                    {photoDetails.source || "Unknown"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Faces/People Section */}
                                    {photoDetails.face && photoDetails.face.length > 0 && (
                                        <div className="bg-chBgPrimary/50 p-4 rounded-lg border border-chBorder">
                                            <h3 className="text-lg font-semibold mb-3 text-chTextPrimary">
                                                People Detected ({photoDetails.face.length})
                                            </h3>
                                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                                {photoDetails.face.map((face) => (
                                                    <div 
                                                        key={face.id} 
                                                        className="flex items-center p-3 rounded-lg bg-chBgPrimary border border-chBorder hover:border-ctaPrimary transition-colors"
                                                    >
                                                        <div className="flex-grow">
                                                            <p className="font-medium text-chTextPrimary">
                                                                {face.person?.name || "Unknown Person"}
                                                                {face.person?.type === "CELEBRITY" && (
                                                                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                                                                        Celebrity
                                                                    </span>
                                                                )}
                                                            </p>
                                                            <div className="text-xs text-chTextSecondary mt-1">
                                                                {face.gender && (
                                                                    <span className="inline-block mr-2">
                                                                        {face.gender.charAt(0) + face.gender.slice(1).toLowerCase()}
                                                                    </span>
                                                                )}
                                                                {face.age && <span>Age: ~{face.age}</span>}
                                                                {face.emotions && face.emotions.length > 0 && (
                                                                    <span className="ml-2 px-1.5 py-0.5 rounded bg-chBgSecondary">
                                                                        {face.emotions[0].toLowerCase()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Labels/Tags Section */}
                                    {photoDetails.mediaMeta && photoDetails.mediaMeta.some(meta => meta.type === "LABEL") && (
                                        <div className="bg-chBgPrimary/50 p-4 rounded-lg border border-chBorder">
                                            <h3 className="text-lg font-semibold mb-3 text-chTextPrimary">
                                                Labels
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {photoDetails.mediaMeta
                                                    .find(meta => meta.type === "LABEL")
                                                    ?.payload
                                                    .slice(0, 15)
                                                    .map((label, index) => (
                                                        <span 
                                                            key={index}
                                                            className="px-3 py-1 bg-chBgPrimary text-chTextPrimary text-sm rounded-full border border-chBorder hover:border-ctaPrimary hover:bg-ctaPrimary/10 transition-colors cursor-default"
                                                        >
                                                            {label.Name}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* OCR Text if available */}
                                    {photoDetails.mediaMeta && 
                                     photoDetails.mediaMeta.some(meta => meta.type === "OCR" && meta.payload.text && meta.payload.text.trim() !== "") && (
                                        <div className="bg-chBgPrimary/50 p-4 rounded-lg border border-chBorder">
                                            <h3 className="text-lg font-semibold mb-3 text-chTextPrimary">
                                                Text in Image
                                            </h3>
                                            <p className="text-chTextPrimary bg-chBgPrimary p-3 rounded-md border border-chBorder">
                                                {photoDetails.mediaMeta.find(meta => meta.type === "OCR").payload.text}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
