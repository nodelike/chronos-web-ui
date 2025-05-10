'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getPersonById } from '@/services/person';
import StorageGrid from '@/components/StorageGrid';
import AddItemModal from '@/app/app/storage/components/AddItemModal';
import { StorageItemTypes } from '@/services/choices';

export default function PersonStoragePage() {
  const params = useParams();
  const router = useRouter();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const data = await getPersonById(params.id);
        setPerson(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching person:', err);
        setError('Failed to load person details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPerson();
    }
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleItemAdded = () => {
    // Force StorageGrid to refresh by updating the key
    setShouldRefresh(prev => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ctaPrimary"></div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="text-center py-10">
        <p className="text-ctaSecondary">{error || 'Person not found'}</p>
        <button 
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-ctaPrimary text-white rounded-md hover:opacity-90"
        >
          Go Back
        </button>
      </div>
    );
  }

  const displayName = person.name || (person.type === 'PERSON' ? 'Unknown Person' : 'Unknown');

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-chTextSecondary hover:text-chTextPrimary mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Back to Person</span>
        </button>
        
        <div className="flex items-center mb-4">
          {person.profilePicture?.s3Url && (
            <img 
              src={person.profilePicture.s3Url} 
              alt={displayName} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          )}
          <div className="flex-grow">
            <h1 className="text-2xl font-semibold text-chTextPrimary">{displayName}&apos;s Storage</h1>
            <p className="text-chTextSecondary mt-1">Manage and view digital content associated with this person</p>
          </div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-ctaPrimary text-white rounded-md hover:opacity-90 flex items-center"
          >
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Person Storage Items Grid - Using key to force refresh */}
      <StorageGrid key={shouldRefresh} personId={params.id} showFilters={true} enableDragDrop={true} />

      {/* Add Item Modal */}
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onItemAdded={handleItemAdded} 
        initialItemType={StorageItemTypes.NOTE}
        personId={params.id}
      />
    </div>
  );
} 