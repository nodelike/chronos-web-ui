import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SearchFilter = ({ onSearch, onFilterChange, initialFilters = {} }) => {
    const [filters, setFilters] = useState({
        search: initialFilters.search || '',
        type: initialFilters.type || '',
        gender: initialFilters.gender || ''
    });
    const [showFilters, setShowFilters] = useState(false);

    const handleSearchChange = (e) => {
        const search = e.target.value;
        setFilters(prev => ({ ...prev, search }));
    };

    const handleFilterChange = (filter, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [filter]: value };
            // Notify parent of filter change
            onFilterChange && onFilterChange(newFilters);
            return newFilters;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch && onSearch(filters);
    };

    const handleClearFilters = () => {
        const clearedFilters = { search: '', type: '', gender: '' };
        setFilters(clearedFilters);
        onFilterChange && onFilterChange(clearedFilters);
    };

    return (
        <div className="bg-chBgSecondary rounded-xl p-4 shadow-sm border border-chBorder mb-6">
            <form onSubmit={handleSubmit}>
                {/* Search bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                        type="search"
                        value={filters.search}
                        onChange={handleSearchChange}
                        className="w-full p-3 ps-10 text-sm text-chTextPrimary border border-chBorder rounded-lg bg-chBgPrimary focus:ring-ctaPrimary focus:border-ctaPrimary focus:outline-none"
                        placeholder="Search people by name..."
                    />
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="absolute end-2.5 bottom-2.5 focus:outline-none bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 flex items-center gap-1"
                    >
                        <FunnelIcon className="w-4 h-4" />
                        <span>Filters</span>
                        {(filters.type || filters.gender) && (
                            <span className="inline-flex items-center justify-center w-4 h-4 ms-1 text-xs font-semibold text-chTextPrimaryInverted bg-ctaPrimary rounded-full">
                                {(filters.type ? 1 : 0) + (filters.gender ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {/* Filter options */}
                {showFilters && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-chBgPrimary rounded-lg border border-chBorder">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-chTextPrimary">Person Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="bg-chBgPrimary border border-chBorder text-chTextPrimary text-sm rounded-lg focus:ring-ctaPrimary focus:border-ctaPrimary block w-full p-2.5"
                            >
                                <option value="">All Types</option>
                                <option value="CELEBRITY">Celebrity</option>
                                <option value="PERSON">Person</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-chTextPrimary">Gender</label>
                            <select
                                value={filters.gender}
                                onChange={(e) => handleFilterChange('gender', e.target.value)}
                                className="bg-chBgPrimary border border-chBorder text-chTextPrimary text-sm rounded-lg focus:ring-ctaPrimary focus:border-ctaPrimary block w-full p-2.5"
                            >
                                <option value="">All Genders</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div className="col-span-full flex justify-end">
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full sm:w-auto text-chTextPrimaryInverted bg-ctaPrimary hover:bg-opacity-90 focus:ring-4 focus:ring-ctaPrimary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchFilter; 