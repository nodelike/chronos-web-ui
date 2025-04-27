import { useState, useEffect } from "react";
import { ArrowUpTrayIcon, DocumentIcon, PhotoIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const FileDragDropHandler = ({ onFileDrop }) => {
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleDragEnter = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Only count drag events with files
            if (e.dataTransfer.types.includes("Files")) {
                setIsDragging(true);
            }
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Check if we're leaving the window or to a child element
            if (e.relatedTarget === null) {
                setIsDragging(false);
            }
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];

                // Determine file type
                let fileType = "document";
                if (file.type.startsWith("image/")) {
                    fileType = "photo";
                } else if (file.type === "application/pdf" || file.type.includes("text/")) {
                    fileType = "document";
                }

                if (onFileDrop) {
                    onFileDrop(file, fileType);
                }
            }
        };

        // Add event listeners to document
        document.addEventListener("dragenter", handleDragEnter);
        document.addEventListener("dragleave", handleDragLeave);
        document.addEventListener("dragover", handleDragOver);
        document.addEventListener("drop", handleDrop);

        // Cleanup
        return () => {
            document.removeEventListener("dragenter", handleDragEnter);
            document.removeEventListener("dragleave", handleDragLeave);
            document.removeEventListener("dragover", handleDragOver);
            document.removeEventListener("drop", handleDrop);
        };
    }, [onFileDrop]);

    if (!isDragging) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center transition-all duration-300 animate-fade-in">
            <div className="bg-chBgSecondary rounded-xl p-8 max-w-md w-full shadow-2xl border border-ctaPrimary animate-bounce-in">
                <div className="flex flex-col items-center gap-6 py-8">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-ctaPrimary/10 border-2 border-dashed border-ctaPrimary">
                        <ArrowUpTrayIcon className="h-10 w-10 text-ctaPrimary" />
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-chTextPrimary mb-2">Drop to Upload</h2>
                        <p className="text-chTextSecondary">Release your file to add it to your storage</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="flex flex-col items-center p-4 rounded-lg bg-chBgPrimary">
                            <PhotoIcon className="h-8 w-8 text-ctaPrimary mb-2" />
                            <span className="text-sm text-chTextSecondary">Photos</span>
                        </div>
                        <div className="flex flex-col items-center p-4 rounded-lg bg-chBgPrimary">
                            <DocumentTextIcon className="h-8 w-8 text-ctaPrimary mb-2" />
                            <span className="text-sm text-chTextSecondary">Documents</span>
                        </div>
                        <div className="flex flex-col items-center p-4 rounded-lg bg-chBgPrimary">
                            <DocumentIcon className="h-8 w-8 text-ctaPrimary mb-2" />
                            <span className="text-sm text-chTextSecondary">Other Files</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileDragDropHandler;
