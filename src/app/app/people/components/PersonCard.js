import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const PersonCard = ({ person, onEdit, onDelete }) => {
    const { id, name, type, gender, age, profilePicture } = person;
    const router = useRouter();
    
    // Display name or a placeholder based on person type
    const displayName = name || (type === 'PERSON' ? `Unknown Person` : 'Unknown');
    
    // Truncate name if too long
    const shortName = displayName.length > 12 
        ? displayName.substring(0, 11) + '...' 
        : displayName;
        
    // Navigate to person's storage
    const handleViewStorage = (e) => {
        e.stopPropagation(); // Prevent triggering the parent onClick (edit)
        router.push(`/app/people/${id}/storage`);
    };

    return (
        <div 
            className="flex flex-col items-center space-y-2 cursor-pointer group relative p-2"
            onClick={() => onEdit && onEdit(person)}
        >
            {/* Circular profile picture container */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-ctaPrimary overflow-hidden flex items-center justify-center bg-chBgSecondary">
                    {profilePicture?.s3Url ? (
                        <img 
                            src={profilePicture.s3Url} 
                            alt={displayName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <UserIcon className="h-10 w-10 text-chTextSecondary" />
                    )}
                </div>
                
                {/* Celebrity indicator */}
                {type === 'CELEBRITY' && (
                    <div className="absolute bottom-0 right-0 bg-ctaPrimary rounded-full p-0.5">
                        <StarIcon className="h-3.5 w-3.5 text-chTextPrimaryInverted" />
                    </div>
                )}
            </div>
            
            {/* Name */}
            <span className="text-sm text-chTextPrimary text-center font-medium">{shortName}</span>
            
            {/* Storage button */}
            <button
                onClick={handleViewStorage}
                className="text-xs text-ctaPrimary hover:underline"
            >
                View Storage
            </button>
            
            {/* Delete button - only visible on hover */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(id);
                }}
                className="absolute top-0 right-0 w-6 h-6 bg-chBgSecondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-ctaSecondary hover:text-chTextPrimaryInverted transition-opacity"
                title="Delete Person"
            >
                <span className="text-sm font-medium">×</span>
            </button>
        </div>
    );
};

export default PersonCard; 