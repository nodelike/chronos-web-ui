import axios from '@/lib/axios';

/**
 * Fetch all storage items with optional filtering
 */
export const getStorageItems = async (options = {}) => {
    try {
        const response = await axios.get('/storage');
        return response.data;
    } catch (error) {
        console.error('Error fetching storage items:', error);
        throw error;
    }
};

/**
 * Fetch storage items for a specific person
 * @param {string} personId - The ID of the person
 * @returns {Promise} - Storage items for the person
 */
export const getPersonStorageItems = async (personId) => {
    try {
        const response = await axios.get(`/people/${personId}/storage`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching storage items for person ${personId}:`, error);
        throw error;
    }
};

export const getStorageItemById = async (id) => {
    const response = await axios.get(`/storage/${id}`);
    return response.data;
};

export const deleteStorageItem = async (id) => {
    const response = await axios.delete(`/storage/${id}`);
    return response.data;
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('/storage/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};


