'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getPersonById } from '@/services/person';
import StorageGrid from '@/components/StorageGrid';

export default function PersonStoragePage() {
  const params = useParams();
  const router = useRouter();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <div>
            <h1 className="text-2xl font-semibold text-chTextPrimary">{displayName}&apos;s Storage</h1>
            <p className="text-chTextSecondary mt-1">Manage and view digital content associated with this person</p>
          </div>
        </div>
      </div>

      {/* Person Storage Items Grid */}
      <StorageGrid personId={params.id} showFilters={true} enableDragDrop={true} />
    </div>
  );
} 