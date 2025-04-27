import React, { useState, useEffect } from "react";
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getStorageItemById } from "@/services/storageItem";
import PeopleGrid from "../components/PeopleGrid";

// Main image section component
const ImageSection = ({ photoDetails, hoveredFace, setHoveredFace, isFullscreen }) => {
    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-black/5">
            <div className="relative flex justify-center bg-black/5">
                {/* Main image with fixed aspect ratio */}
                <img
                    src={photoDetails.uri}
                    alt={photoDetails.fileName}
                    className={`${isFullscreen ? "max-h-[75vh] w-auto object-contain" : "w-full h-auto max-h-[500px] object-contain"}`}
                />

                {/* Bounding box overlays */}
                {photoDetails.face &&
                    photoDetails.face.map((face) => {
                        const { boundingBox } = face;
                        const isHovered = hoveredFace === face.id;

                        if (!boundingBox) return null;

                        return (
                            <div
                                key={face.id}
                                className={`absolute border-2 transition-all duration-300 ${isHovered ? "border-ctaPrimary" : "border-transparent"}`}
                                style={{
                                    top: `${boundingBox.Top * 100}%`,
                                    left: `${boundingBox.Left * 100}%`,
                                    width: `${boundingBox.Width * 100}%`,
                                    height: `${boundingBox.Height * 100}%`,
                                    boxShadow: isHovered ? "0 0 0 2px rgba(0,0,0,0.3)" : "none",
                                }}>
                                {isHovered && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-ctaPrimary text-white text-xs px-1 py-0.5 text-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {face.person?.name || "Unknown"}
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

// File info card component
const FileInfoCard = ({ photoDetails }) => {
    return (
        <div className="mt-4 bg-chBgPrimary/50 p-4 rounded-xl border border-chBorder shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-chTextSecondary text-sm">File name</span>
                    <p className="text-chTextPrimary font-medium truncate">{photoDetails.fileName}</p>
                </div>
                <div>
                    <span className="text-chTextSecondary text-sm">Size</span>
                    <p className="text-chTextPrimary font-medium">{Math.round(photoDetails.fileSize / 1024)} KB</p>
                </div>
                <div>
                    <span className="text-chTextSecondary text-sm">Created</span>
                    <p className="text-chTextPrimary font-medium">{new Date(photoDetails.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <span className="text-chTextSecondary text-sm">Type</span>
                    <p className="text-chTextPrimary font-medium">{photoDetails.mimeType}</p>
                </div>
            </div>
        </div>
    );
};

// Labels component
const LabelsSection = ({ mediaMeta }) => {
    const labelMeta = mediaMeta?.find((meta) => meta.type === "LABEL");
    if (!labelMeta || !labelMeta.payload) return null;

    return (
        <div className="bg-chBgPrimary/50 p-5 rounded-xl border border-chBorder shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-chTextPrimary">Image Recognition</h3>
            <div className="flex flex-wrap gap-2">
                {labelMeta.payload.slice(0, 15).map((label, index) => (
                    <span
                        key={index}
                        className="px-3 py-1.5 bg-chBgPrimary text-chTextPrimary text-sm rounded-full border border-chBorder hover:border-ctaPrimary hover:bg-ctaPrimary/10 transition-colors cursor-default">
                        {label.Name}
                    </span>
                ))}
            </div>
        </div>
    );
};

// OCR component
const OcrSection = ({ mediaMeta }) => {
    const ocrMeta = mediaMeta?.find((meta) => meta.type === "OCR");
    if (!ocrMeta || !ocrMeta.payload.text || ocrMeta.payload.text.trim() === "") return null;

    return (
        <div className="bg-chBgPrimary/50 p-5 rounded-xl border border-chBorder shadow-sm">
            <h3 className="text-lg font-semibold mb-1 text-chTextPrimary">Text found:</h3>
            <p className="text-chTextPrimary">{ocrMeta.payload.text}</p>
        </div>
    );
};

// Content Moderation component
const ContentModerationSection = ({ mediaMeta }) => {
    const moderationMeta = mediaMeta?.find((meta) => meta.type === "CONTENT_MODERATION");
    if (!moderationMeta || !moderationMeta.payload || moderationMeta.payload.length === 0) return null;

    return (
        <div className="bg-chBgPrimary/50 p-5 rounded-xl border border-chBorder shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-chTextPrimary">Content Advisory</h3>
            <div className="space-y-1">
                {moderationMeta.payload.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div>
                            <span className="text-chTextPrimary font-medium text-sm">{item.Name}</span>
                            {item.ParentName && <span className="text-chTextSecondary text-xs ml-2">({item.ParentName})</span>}
                        </div>
                        <div className="flex items-center">
                            <div
                                className={`w-16 h-1.5 rounded-full mr-2 ${
                                    item.Confidence > 90 ? "bg-red-500" : item.Confidence > 70 ? "bg-orange-500" : "bg-yellow-500"
                                }`}>
                                <div className="h-full bg-gray-200 rounded-full" style={{ width: `${100 - item.Confidence}%` }}></div>
                            </div>
                            <span className="text-xs text-chTextSecondary">{item.Confidence.toFixed(1)}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Modal header component
const ModalHeader = ({ photoDetails, isFullscreen, toggleFullscreen, onClose, loading }) => {
    return (
        <div className="flex justify-between items-center p-4 border-b border-chBorder bg-gradient-to-r from-chBgSecondary to-chBgPrimary/30 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-chTextPrimary">{loading ? "Loading..." : photoDetails?.fileName || "Photo Details"}</h2>
            <div className="flex items-center gap-2">
                {!loading && photoDetails && (
                    <>
                        <button
                            className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                            title="Download Image">
                            <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20" title="Share Image">
                            <ShareIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={toggleFullscreen}
                            className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                            title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5">
                                {isFullscreen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                                    />
                                )}
                            </svg>
                        </button>
                    </>
                )}
                <button
                    onClick={onClose}
                    className="text-chTextSecondary hover:text-chTextPrimary p-1.5 rounded-full hover:bg-gray-200/20"
                    title="Close">
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

// Loading spinner component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ctaPrimary"></div>
    </div>
);

// Error message component
const ErrorMessage = ({ message }) => <div className="text-red-500 text-center py-10">{message}</div>;

// Main PhotoModal component
const PhotoModal = ({ itemId, isOpen, onClose }) => {
    const [photoDetails, setPhotoDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hoveredFace, setHoveredFace] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Add CSS animation for tooltip
    useEffect(() => {
        // Add animation keyframes for tooltip
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.2s ease-out forwards;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        // Add mouse move event listener
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

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
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscKey);

        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, itemId, onClose]);

    // Prevent scroll on body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-black/85 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}>
            <div
                className={`relative bg-chBgSecondary rounded-xl shadow-2xl border border-chBorder overflow-hidden flex flex-col transition-all duration-300 ${
                    isFullscreen ? "w-full h-full max-w-none max-h-none rounded-none" : "w-full max-w-6xl max-h-[90vh] m-4"
                }`}>
                {/* Modal Header */}
                <ModalHeader
                    photoDetails={photoDetails}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={toggleFullscreen}
                    onClose={onClose}
                    loading={loading}
                />

                {/* Modal Content */}
                <div className="overflow-y-auto flex-grow">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : (
                        <div className={`${isFullscreen ? "p-8" : "p-6"}`}>
                            <div className={`flex ${isFullscreen ? "flex-col" : "flex-col lg:flex-row"} gap-8`}>
                                {/* Photo Display Section */}
                                <div className={`${isFullscreen ? "w-full max-w-5xl mx-auto" : "lg:w-3/5"} flex flex-col`}>
                                    <ImageSection
                                        photoDetails={photoDetails}
                                        hoveredFace={hoveredFace}
                                        setHoveredFace={setHoveredFace}
                                        isFullscreen={isFullscreen}
                                    />

                                    {!isFullscreen && <FileInfoCard photoDetails={photoDetails} />}
                                </div>

                                {/* Metadata Section */}
                                <div className={`${isFullscreen ? "w-full max-w-5xl mx-auto" : "lg:w-2/5"}`}>
                                    <div className="space-y-6">
                                        <PeopleGrid
                                            faces={photoDetails.face}
                                            hoveredFace={hoveredFace}
                                            setHoveredFace={setHoveredFace}
                                            mousePosition={mousePosition}
                                            isFullscreen={isFullscreen}
                                        />
                                        <LabelsSection mediaMeta={photoDetails.mediaMeta} />
                                        <OcrSection mediaMeta={photoDetails.mediaMeta} />
                                        <ContentModerationSection mediaMeta={photoDetails.mediaMeta} />
                                    </div>
                                </div>
                            </div>

                            {/* Show file info at the bottom in fullscreen mode */}
                            {isFullscreen && (
                                <div className="mt-8 max-w-5xl mx-auto">
                                    <FileInfoCard photoDetails={photoDetails} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
