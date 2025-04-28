import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Don't render pagination if there's only one page
    if (totalPages <= 1) return null;
    
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages are less than max pages to show
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always include first and last page
            pages.push(1);
            
            // Calculate middle pages
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            
            // Adjust if at the beginning or end
            if (currentPage <= 2) {
                endPage = 4;
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 3;
            }
            
            // Add ellipsis if needed
            if (startPage > 2) {
                pages.push('...');
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            // Add ellipsis if needed
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            
            // Add last page if not already included
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };
    
    return (
        <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-chTextSecondary">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </div>
            
            <div className="flex items-center space-x-2">
                {/* Previous button */}
                <button
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md flex items-center justify-center ${
                        currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-chTextPrimary hover:bg-chBgPrimary hover:text-ctaPrimary'
                    }`}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="sr-only">Previous</span>
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-1">...</span>
                            ) : (
                                <button
                                    onClick={() => page !== currentPage && onPageChange(page)}
                                    className={`px-3 py-1 rounded-md ${
                                        page === currentPage
                                            ? 'bg-ctaPrimary text-white'
                                            : 'text-chTextPrimary hover:bg-chBgPrimary'
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                
                {/* Next button */}
                <button
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md flex items-center justify-center ${
                        currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-chTextPrimary hover:bg-chBgPrimary hover:text-ctaPrimary'
                    }`}
                >
                    <ChevronRightIcon className="h-5 w-5" />
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination; 