import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/tasks', // URL do backend
});

export const getTasks = (status) => api.get(`?status=${status || ''}`);
export const createTask = (title) => api.post('', { title });
export const updateTask = (id, data) => api.put(`/${id}`, data);
export const deleteTask = (id) => api.delete(`/${id}`);