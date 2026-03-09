import axios from "axios";

const API_URL = "https://todo-shme.onrender.com/api/tasks";

export const getTodos = () => axios.get(API_URL);
export const createTodo = (data) => axios.post(API_URL, data);
export const updateTodo = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const updateTodoStatus = (id, status) =>
  axios.put(`${API_URL}/${id}/status`, { status });
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const searchTodo = (query) =>
  axios.get(`${API_URL}?search=${query}`);