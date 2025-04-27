import React, { useState, useRef, useEffect } from "react";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const PhotoUploader = ({ onFileSelect, onError, initialFile }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Process the initialFile when it changes
    useEffect(() => {
        if (initialFile) {
            validateAndPreviewFile(initialFile);
        }
    }, [initialFile]);

    const validateAndPreviewFile = (file) => {
        // Reset states
        setErrorMessage("");

        // Check if file is an image
        if (!file.type.startsWith("image/")) {
            const newError = "Please select an image file (JPG, PNG, etc.)";
            setErrorMessage(newError);
            if (onError) onError(newError);
            return;
        }

        // Check file size (limit to 300MB)
        if (file.size > 300 * 1024 * 1024) {
            const newError = "File size exceeds 300MB limit";
            setErrorMessage(newError);
            if (onError) onError(newError);
            return;
        }

        // Create preview URL
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

        setUploadedFile(file);
        if (onFileSelect) onFileSelect(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateAndPreviewFile(file);
        }
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            validateAndPreviewFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const clearImage = () => {
        setUploadedFile(null);
        setPreviewUrl(null);
        if (onFileSelect) onFileSelect(null);
    };

    const setProgress = (progress) => {
        setUploadProgress(progress);
        setIsUploading(progress > 0 && progress < 100);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-chTextPrimary">Upload Photo</label>

            {!previewUrl ? (
                // Drag and drop area
                <div
                    className="border-2 border-dashed border-chBorder rounded-lg p-8 text-center cursor-pointer hover:border-ctaPrimary transition-colors"
                    onClick={triggerFileInput}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <div className="flex flex-col items-center gap-2">
                        <ArrowUpTrayIcon className="h-10 w-10 text-chTextSecondary" />
                        <p className="text-chTextPrimary font-medium">Drag and drop your photo here</p>
                        <p className="text-chTextSecondary text-sm">or click to browse</p>
                        <p className="text-chTextSecondary text-xs mt-2">Supports: JPG, PNG, GIF (up to 300MB)</p>
                    </div>
                </div>
            ) : (
                // Preview area
                <div className="relative rounded-lg overflow-hidden border border-chBorder">
                    <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[200px] object-contain bg-black/10" />
                    <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {isUploading && (
                <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-ctaPrimary h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="text-xs text-right text-chTextSecondary mt-1">
                        {uploadProgress === 100 ? "Upload complete!" : `Uploading: ${uploadProgress}%`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PhotoUploader;
