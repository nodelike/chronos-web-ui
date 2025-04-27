import React from "react";
import { useState } from "react";
import PhotoModal from "../containers/PhotoModal";

const PhotoCard = ({ item, refetchItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const thumbnailUrl = item.thumbnail ?? item.uri;
    const isProcessing = item.processedAt === null;

    const handleClick = () => {
        if (!isProcessing) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className={`rounded-xl border border-chBorder shadow-sm hover:shadow-md break-inside-avoid mb-4 ${
                    !isProcessing ? "cursor-pointer hover:scale-[1.02]" : "cursor-default"
                } transform transition-all duration-200 relative`}>
                {/* Photo Content */}
                <div className="rounded-lg overflow-hidden">
                    <img src={thumbnailUrl} alt={item.fileName} className="w-full h-auto" />

                    {/* Processing tag */}
                    {isProcessing && (
                        <div className="absolute top-2 right-2 bg-ctaPrimary text-chTextPrimaryInverted px-2.5 py-1 rounded-full text-xs font-medium shadow-md">
                            Processing
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && <PhotoModal itemId={item.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refetchItems={refetchItems} />}
        </>
    );
};

export default PhotoCard;
