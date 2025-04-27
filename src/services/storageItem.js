import axios from '@/lib/axios';

export const getStorageItems = async () => {
    const response = await axios.get('/storage');
    console.log(response.data);
    return response.data;
};

export const getStorageItemById = async (id) => {
    const response = await axios.get(`/storage/${id}`);
    return response.data;
};


