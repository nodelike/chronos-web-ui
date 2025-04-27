import axios from '@/lib/axios';

export const getStorageItems = async () => {
    const response = await axios.get('/storage');
    return response.data;
};

export const getStorageItemById = async (id) => {
    const response = await axios.get(`/storage/${id}`);
    return response.data;
};

export const deleteStorageItem = async (id) => {
    const response = await axios.delete(`/storage/${id}`);
    return response.data;
};

export const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('/storage/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};


