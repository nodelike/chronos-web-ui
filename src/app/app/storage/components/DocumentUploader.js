import React, { useState, useEffect } from "react";
import { XMarkIcon, DocumentIcon, PaperClipIcon } from "@heroicons/react/24/outline";

const DocumentUploader = ({ onFileSelect, onTitleChange, initialFile, initialTitle = "" }) => {
    const [documentFile, setDocumentFile] = useState(null);
    const [documentTitle, setDocumentTitle] = useState(initialTitle);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (initialFile) {
            validateDocument(initialFile);
            if (!documentTitle && initialFile.name) {
                setDocumentTitle(initialFile.name);
                if (onTitleChange) onTitleChange(initialFile.name);
            }
        }
    }, [initialFile, documentTitle, onTitleChange]);

    useEffect(() => {
        if (initialTitle) {
            setDocumentTitle(initialTitle);
        }
    }, [initialTitle]);

    const validateDocument = (file) => {
        // Reset error message
        setErrorMessage("");
        
        // Check file size (limit to 300MB)
        if (file.size > 300 * 1024 * 1024) {
            const newError = "File size exceeds 300MB limit";
            setErrorMessage(newError);
            if (onFileSelect) onFileSelect(null);
            return false;
        }
        
        // If validation passes, set the file
        setDocumentFile(file);
        if (onFileSelect) onFileSelect(file);
        return true;
    };

    const handleTitleChange = (e) => {
        setDocumentTitle(e.target.value);
        if (onTitleChange) onTitleChange(e.target.value);
    };

    const clearDocument = () => {
        setDocumentFile(null);
        if (onFileSelect) onFileSelect(null);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-chTextPrimary">Document Title</label>
            <input
                type="text"
                className="w-full rounded-md border border-chBorder bg-chBgPrimary px-3 py-2 text-chTextPrimary focus:outline-none focus:ring-1 focus:ring-ctaPrimary"
                placeholder="Enter document title"
                value={documentTitle}
                onChange={handleTitleChange}
            />
            
            {documentFile ? (
                <div className="mt-4 p-3 bg-chBgPrimary border border-chBorder rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <DocumentIcon className="h-10 w-10 text-ctaPrimary mr-3" />
                        <div>
                            <p className="text-chTextPrimary font-medium truncate max-w-[200px]">{documentFile.name}</p>
                            <p className="text-chTextSecondary text-xs">{Math.round(documentFile.size / 1024)} KB</p>
                        </div>
                    </div>
                    <button onClick={clearDocument} className="text-chTextSecondary hover:text-red-500">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            ) : (
                <div className="border-2 border-dashed border-chBorder rounded-lg p-4 text-center cursor-pointer hover:border-ctaPrimary transition-colors mt-4">
                    <div className="flex flex-col items-center gap-2">
                        <PaperClipIcon className="h-8 w-8 text-chTextSecondary" />
                        <p className="text-chTextPrimary font-medium">File dropped and ready to upload</p>
                        <p className="text-chTextSecondary text-xs">Edit the title above before saving (max 300MB)</p>
                    </div>
                </div>
            )}
            
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
    );
};

export default DocumentUploader; 