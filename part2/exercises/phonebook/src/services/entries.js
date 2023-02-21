import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const personService = {
    getAll: async () => {
        const request = axios.get(baseUrl);
        const response = await request;
            return response.data;
    }, 

    create: async (personObject) => {
        const request = axios.post(baseUrl, personObject)
        const response = await request
            return response.data
    },

    update: async (id, personObject) => {
        const request = axios.put(`${baseUrl}/${id}`, personObject)
        const response = await request
            return response.data
    },

    remove: async (id) => {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    },
};

export default personService