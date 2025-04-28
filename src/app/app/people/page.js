'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { getPeople } from '@/services/person';
import PersonCard from './components/PersonCard';
import SearchFilter from './components/SearchFilter';

export default function PeoplePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const loadingRef = useRef(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    gender: ''
  });

  // Action states
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Setup intersection observer for infinite scrolling
  const lastPersonElementRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  // Reset page when filters change
  useEffect(() => {
    setPeople([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  // Fetch people when page changes
  useEffect(() => {
    fetchPeople();
  }, [page, filters]);

  const fetchPeople = async () => {
    if (!hasMore && page !== 1) return;
    
    try {
      setLoading(true);
      const response = await getPeople({
        page: page,
        limit: 20,
        search: filters.search || undefined,
        type: filters.type || undefined,
        gender: filters.gender || undefined
      });

      setPeople(prevPeople => {
        // If it's the first page, replace all people
        if (page === 1) return response.data;
        // Otherwise append the new people
        return [...prevPeople, ...response.data];
      });
      
      // Check if we have more data to load
      setHasMore(response.data.length > 0 && response.metadata.page < response.metadata.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch people');
      console.error('Error fetching people:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    // Reset everything when applying new filters
    setPeople([]);
    setPage(1);
    setHasMore(true);
    setFilters(newFilters);
  };

  const handleEditPerson = (person) => {
    setSelectedPerson(person);
    setIsEditModalOpen(true);
  };

  const handleDeletePerson = (personId) => {
    setSelectedPerson(personId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-chTextPrimary">People</h1>
          <p className="text-chTextSecondary mt-1">Manage people in your database</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-ctaPrimary hover:bg-ctaPrimaryHover text-white px-4 py-2 rounded-md flex items-center space-x-2 transition duration-150"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Person</span>
        </button>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        onSearch={() => {
          setPeople([]);
          setPage(1);
          setHasMore(true);
        }}
      />

      {/* People Grid */}
      <div className="mt-6">
        {people.length === 0 && loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ctaPrimary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
            <button 
              onClick={fetchPeople}
              className="mt-4 px-4 py-2 bg-ctaPrimary text-white rounded-md hover:bg-ctaPrimaryHover"
            >
              Try Again
            </button>
          </div>
        ) : people.length === 0 && !loading ? (
          <div className="text-center py-16 bg-chBgSecondary rounded-lg">
            <h3 className="text-lg font-medium text-chTextPrimary">No people found</h3>
            <p className="text-chTextSecondary mt-1">
              {filters.search || filters.type || filters.gender
                ? 'Try changing your filters or adding a new person'
                : 'Get started by adding a new person'}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 px-4 py-2 bg-ctaPrimary text-white rounded-md hover:bg-ctaPrimaryHover"
            >
              Add Person
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
              {people.map((person, index) => {
                // Add ref to last element for infinite scrolling
                if (people.length === index + 1) {
                  return (
                    <div ref={lastPersonElementRef} key={person.id}>
                      <PersonCard
                        person={person}
                        onEdit={() => handleEditPerson(person)}
                        onDelete={() => handleDeletePerson(person.id)}
                      />
                    </div>
                  );
                } else {
                  return (
                    <PersonCard
                      key={person.id}
                      person={person}
                      onEdit={() => handleEditPerson(person)}
                      onDelete={() => handleDeletePerson(person.id)}
                    />
                  );
                }
              })}
            </div>
            
            {/* Loading indicator at bottom */}
            {loading && (
              <div className="flex justify-center my-6" ref={loadingRef}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ctaPrimary"></div>
              </div>
            )}
            
            {/* End of results message */}
            {!hasMore && people.length > 0 && !loading && (
              <div className="text-center text-chTextSecondary my-6">
                No more people to load
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Person Modal would go here */}
      {/* Edit Person Modal would go here */}
      {/* Delete Person Modal would go here */}
    </div>
  );
} 