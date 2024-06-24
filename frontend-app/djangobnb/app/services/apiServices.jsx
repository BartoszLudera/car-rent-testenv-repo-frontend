import axios from 'axios';
import { getSessionToken } from '../lib/action';

const apiService = {
    get: async function(url) {
        console.log('get', url);
        try {
            const response = await axios.get(url);
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    post: async function(url, data) {
        const sessionToken = await getSessionToken();

        if (!sessionToken) {
            console.error('No session token found.');
            return;
        }

        if (!sessionToken) {
            console.error('Session token found but without value');
            return;
        }
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `token ${sessionToken}`
                }
            });
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    postWithoutToken: async function(url, data) {
        console.log('post', url, data);
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            return response;
        } catch (error) {
            console.error('Error response:', error.response.data);
            throw error;
        }
    },

    postForm: async function(url, data) {
        const sessionToken = await getSessionToken();

        if (!sessionToken) {
            console.error('No session token found.');
            return;
        }

        if (!sessionToken) {
            console.error('Session token found but without value');
            return;
        }
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `token ${sessionToken}`
                }
            });
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


};

export default apiService;
