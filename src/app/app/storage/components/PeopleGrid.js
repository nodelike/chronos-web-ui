import React from "react";

// People grid component
const PeopleGrid = ({ faces, hoveredFace, setHoveredFace, mousePosition, isFullscreen }) => {
    if (!faces || faces.length === 0) return null;

    return (
        <div className="bg-chBgPrimary/50 p-5 rounded-xl border border-chBorder shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-chTextPrimary">People Detected ({faces.length})</h3>
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${isFullscreen ? 'lg:grid-cols-6 xl:grid-cols-8' : 'lg:grid-cols-4'} gap-3 ${isFullscreen ? 'max-h-[480px]' : 'max-h-[380px]'} overflow-y-auto pr-2 scrollbar-thin`}>
                {faces.map((face) => (
                    <div
                        key={face.id}
                        className={`flex flex-col relative rounded-lg transition-all cursor-pointer overflow-hidden ${isFullscreen ? 'scale-95' : ''}`}
                        onMouseEnter={() => setHoveredFace(face.id)}
                        onMouseLeave={() => setHoveredFace(null)}>
                        {/* Profile picture - square aspect ratio */}
                        <div className="aspect-square w-full overflow-hidden relative">
                            {face.person?.profilePicture ? (
                                <img
                                    src={face.person.profilePicture.s3Url}
                                    alt={face.person.name || "Person"}
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-10 h-10">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                        />
                                    </svg>
                                </div>
                            )}

                            {/* Badge for celebrity */}
                            {face.person?.type === "CELEBRITY" && (
                                <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-violet-500"></span>
                            )}
                        </div>

                        {/* Tooltip that appears on hover */}
                        <div className="flex-grow mt-1">
                            <p className={`font-medium text-chTextPrimary ${isFullscreen ? 'text-[10px]' : 'text-xs'} text-center line-clamp-1`}>{face.person?.name || "Unknown Person"}</p>

                            {/* Tooltip */}
                            {hoveredFace === face.id && mousePosition && (
                                <div
                                    className="fixed z-50 p-3 bg-chBgPrimary shadow-lg rounded-lg border border-chBorder text-xs animate-fadeIn"
                                    style={{
                                        top: `${mousePosition.y - 70}px`,
                                        left: `${mousePosition.x + 15}px`,
                                        maxWidth: "250px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                                    }}>
                                    <div className="font-semibold text-chTextPrimary mb-2">{face.person?.name || "Unknown Person"}</div>
                                    <div className="text-chTextSecondary space-y-1">
                                        {face.person?.type === "CELEBRITY" && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-violet-500 font-medium">Celebrity</span>
                                            </div>
                                        )}
                                        {face.gender && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-chTextTertiary">Gender:</span>{" "}
                                                {face.gender.charAt(0) + face.gender.slice(1).toLowerCase()}
                                            </div>
                                        )}
                                        {face.age && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-chTextTertiary">Age:</span> ~{face.age}
                                            </div>
                                        )}
                                        {face.emotions && face.emotions.length > 0 && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-chTextTertiary">Emotion:</span> {face.emotions[0].toLowerCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleGrid;
