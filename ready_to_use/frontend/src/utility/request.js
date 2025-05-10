import axios from 'axios';

const Api = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',

    async fetch(endpoint, options = {}) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            };

            const response = await axios({
                url: `${this.baseURL}${endpoint}`,
                method: options.method || 'GET',
                headers,
                data: options.data,
                params: options.params
            });

            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            throw error;
        }
    },

    // Convenience methods
    get(endpoint, options = {}) {
        return this.fetch(endpoint, { ...options, method: 'GET' });
    },

    post(endpoint, data, options = {}) {
        return this.fetch(endpoint, { ...options, method: 'POST', data });
    },

    put(endpoint, data, options = {}) {
        return this.fetch(endpoint, { ...options, method: 'PUT', data });
    },

    delete(endpoint, options = {}) {
        return this.fetch(endpoint, { ...options, method: 'DELETE' });
    }
};

export default Api;