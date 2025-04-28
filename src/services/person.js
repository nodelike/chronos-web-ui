import axios from '@/lib/axios';

/**
 * Fetch a paginated list of people with optional filtering
 * @param {Object} options - Query parameters
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {string} options.search - Search term
 * @param {string} options.gender - Filter by gender
 * @param {string} options.type - Filter by type
 * @param {string} options.status - Filter by status
 * @returns {Promise<Object>} - People data with pagination metadata
 */
export async function getPeople(options = {}) {
  try {
    const { page = 1, limit = 10, search = '', gender = '', type = '', status = '' } = options;
    
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    
    if (search) params.append('search', search);
    if (gender) params.append('gender', gender);
    if (type) params.append('type', type);
    if (status) params.append('status', status);
    
    const response = await axios.get(`/people?${params.toString()}`);
    return {
      data: response.data.data.people,
      metadata: response.data.data.metadata
    };
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
}

/**
 * Fetch a single person by ID
 * @param {string} id - Person ID
 * @returns {Promise<Object>} - Person data
 */
export async function getPersonById(id) {
  try {
    const response = await axios.get(`/people/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching person with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new person
 * @param {Object} personData - Person data
 * @returns {Promise<Object>} - Created person data
 */
export async function createPerson(personData) {
  try {
    const response = await axios.post(`/people`, personData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
}

/**
 * Update an existing person
 * @param {string} id - Person ID
 * @param {Object} personData - Updated person data
 * @returns {Promise<Object>} - Updated person data
 */
export async function updatePerson(id, personData) {
  try {
    const response = await axios.put(`/people/${id}`, personData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating person with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a person
 * @param {string} id - Person ID
 * @returns {Promise<Object>} - Response data
 */
export async function deletePerson(id) {
  try {
    const response = await axios.delete(`/people/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting person with ID ${id}:`, error);
    throw error;
  }
} 