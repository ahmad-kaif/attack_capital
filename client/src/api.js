import axios from 'axios';

const baseURL = '/api'; // ✅ rely on Vite proxy

console.log('API baseURL:', baseURL);

export const api = axios.create({ baseURL });

// Bots
export const listBots = () => api.get('/bots').then(r => r.data);
export const createBot = (payload) => api.post('/bots', payload).then(r => r.data);
export const updateBot = (id, payload) => api.put(`/bots/${id}`, payload).then(r => r.data);
export const deleteBot = (id) => api.delete(`/bots/${id}`).then(r => r.data);

// Logs
export const getLogs = () => api.get('/logs').then(r => r.data);
