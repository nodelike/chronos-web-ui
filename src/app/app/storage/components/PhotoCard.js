import React from "react";
import { useState } from "react";
import PhotoModal from "../containers/PhotoModal";

const PhotoCard = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const thumbnailUrl = item.thumbnail ?? item.uri;

    const handleClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div
                onClick={handleClick}
                className={`rounded-xl border border-chBorder shadow-sm hover:shadow-md break-inside-avoid mb-4 cursor-pointer hover:scale-[1.02] transform transition-all duration-200`}>
                {/* Photo Content */}
                <div className="rounded-lg overflow-hidden">
                    <img src={thumbnailUrl} alt={item.fileName} className="w-full h-auto" />
                </div>
            </div>
            
            {isModalOpen && (
                <PhotoModal 
                    itemId={item.id} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
};

export default PhotoCard;
