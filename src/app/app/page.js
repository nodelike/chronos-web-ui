"use client";

import { useState, useEffect } from "react";
import {
    DocumentTextIcon,
    CheckCircleIcon,
    LinkIcon,
    DocumentIcon,
    CalendarIcon,
    PhotoIcon,
    StarIcon,
    TrashIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";

// Dummy data to simulate different card types
const DUMMY_ITEMS = [
    {
        id: 1,
        type: "note",
        title: "Meeting Notes",
        content: "Discussed project timeline and deliverables. Next steps include setting up the infrastructure and creating wireframes.",
        date: "2 days ago",
        color: "bg-yellow-100 border-yellow-200",
        icon: DocumentTextIcon
    },
    {
        id: 2,
        type: "task",
        title: "Complete Backend API",
        content: "Implement user authentication and storage endpoints",
        completed: false,
        dueDate: "Tomorrow",
        priority: "High",
        color: "bg-blue-100 border-blue-200",
        icon: CheckCircleIcon
    },
    {
        id: 3,
        type: "link",
        title: "Interesting Article",
        url: "https://medium.com/article/123",
        description: "How to build scalable applications with modern architecture",
        date: "1 week ago",
        color: "bg-purple-100 border-purple-200",
        icon: LinkIcon
    },
    {
        id: 4,
        type: "file",
        title: "Project Proposal",
        fileType: "PDF",
        size: "2.4 MB",
        date: "3 days ago",
        color: "bg-red-100 border-red-200",
        icon: DocumentIcon
    },
    {
        id: 5,
        type: "event",
        title: "Team Meeting",
        date: "May 15, 2023",
        time: "2:00 PM",
        location: "Conference Room A",
        color: "bg-green-100 border-green-200",
        icon: CalendarIcon
    },
    {
        id: 6,
        type: "image",
        title: "Website Mockup",
        imageUrl: "https://via.placeholder.com/300x200",
        date: "Yesterday",
        color: "bg-pink-100 border-pink-200",
        icon: PhotoIcon
    },
    {
        id: 7,
        type: "note",
        title: "Brainstorming Session",
        content: "Ideas for new features: 1. Dark mode, 2. Mobile app, 3. Social sharing",
        date: "4 days ago",
        color: "bg-yellow-100 border-yellow-200",
        icon: DocumentTextIcon
    },
    {
        id: 8,
        type: "task",
        title: "Design Homepage",
        content: "Create a responsive design for the landing page",
        completed: true,
        dueDate: "Completed",
        color: "bg-blue-100 border-blue-200",
        icon: CheckCircleIcon
    },
    {
        id: 9,
        type: "link",
        title: "Design Resources",
        url: "https://dribbble.com/shots/popular",
        description: "Collection of UI inspiration and design assets",
        date: "5 days ago",
        color: "bg-purple-100 border-purple-200",
        icon: LinkIcon
    },
    {
        id: 10,
        type: "file",
        title: "Presentation Slides",
        fileType: "PPTX",
        size: "5.7 MB",
        date: "1 day ago",
        color: "bg-red-100 border-red-200",
        icon: DocumentIcon
    }
];

export default function StoragePage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Simulating data fetch
        setItems(DUMMY_ITEMS);
    }, []);

    const filteredItems = filter === "all" 
        ? items 
        : items.filter(item => item.type === filter);

    // Render different card types based on item type
    const renderCard = (item) => {
        const CardIcon = item.icon;
        
        return (
            <div 
                key={item.id}
                className={`rounded-xl p-4 border ${item.color} shadow-sm hover:shadow-md transition-shadow break-inside-avoid mb-4`}
            >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-2 ${item.type === 'task' && item.completed ? 'bg-green-200' : ''}`}>
                            <CardIcon className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Card Content */}
                <div className="mb-3">
                    {item.type === 'note' && (
                        <p className="text-sm text-gray-700 line-clamp-3">{item.content}</p>
                    )}
                    
                    {item.type === 'task' && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-700 line-clamp-2">{item.content}</p>
                            <div className="flex justify-between text-xs">
                                <span className={`px-2 py-1 rounded ${item.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                    {item.completed ? 'Completed' : item.dueDate}
                                </span>
                                {!item.completed && (
                                    <span className="px-2 py-1 rounded bg-red-200 text-red-800">
                                        {item.priority}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {item.type === 'link' && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block truncate">
                                {item.url}
                            </a>
                        </div>
                    )}
                    
                    {item.type === 'file' && (
                        <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-gray-700">{item.fileType}</span>
                            <span className="text-gray-500">{item.size}</span>
                        </div>
                    )}
                    
                    {item.type === 'event' && (
                        <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-700">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>{item.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700">
                                <span className="font-medium">{item.time}</span>
                                <span className="mx-1">•</span>
                                <span>{item.location}</span>
                            </div>
                        </div>
                    )}
                    
                    {item.type === 'image' && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                        </div>
                    )}
                </div>
                
                {/* Card Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                    <span>{item.date}</span>
                    <div className="flex space-x-2">
                        <button className="p-1 hover:text-yellow-500" title="Favorite">
                            <StarIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:text-red-500" title="Delete">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-chTextPrimary mb-2">My Storage</h1>
                <p className="text-chTextSecondary">Organize and access your digital content</p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button 
                    onClick={() => setFilter('all')} 
                    className={`px-4 py-2 rounded-full text-sm ${filter === 'all' 
                        ? 'bg-ctaPrimary text-white' 
                        : 'bg-chBgSecondary text-chTextPrimary border border-chBorder'}`}
                >
                    All Items
                </button>
                <button 
                    onClick={() => setFilter('note')} 
                    className={`px-4 py-2 rounded-full text-sm ${filter === 'note' 
                        ? 'bg-ctaPrimary text-white' 
                        : 'bg-chBgSecondary text-chTextPrimary border border-chBorder'}`}
                >
                    Notes
                </button>
                <button 
                    onClick={() => setFilter('task')} 
                    className={`px-4 py-2 rounded-full text-sm ${filter === 'task' 
                        ? 'bg-ctaPrimary text-white' 
                        : 'bg-chBgSecondary text-chTextPrimary border border-chBorder'}`}
                >
                    Tasks
                </button>
                <button 
                    onClick={() => setFilter('link')} 
                    className={`px-4 py-2 rounded-full text-sm ${filter === 'link' 
                        ? 'bg-ctaPrimary text-white' 
                        : 'bg-chBgSecondary text-chTextPrimary border border-chBorder'}`}
                >
                    Links
                </button>
                <button 
                    onClick={() => setFilter('file')} 
                    className={`px-4 py-2 rounded-full text-sm ${filter === 'file' 
                        ? 'bg-ctaPrimary text-white' 
                        : 'bg-chBgSecondary text-chTextPrimary border border-chBorder'}`}
                >
                    Files
                </button>
            </div>
            
            {/* Pinterest-like Grid Layout */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {filteredItems.map(renderCard)}
            </div>
            
            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-chTextSecondary">No items found. Add some new content!</p>
                </div>
            )}
        </div>
    );
}
