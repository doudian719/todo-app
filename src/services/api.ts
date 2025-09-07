import axios, { AxiosResponse } from 'axios';
import { Task, ApiResponse, TaskPayload, TaskStatusUpdate } from '../types';

// API base configuration
const API_BASE_URL = 'http://localhost:8080/api';
const AUTH_TOKEN = 'valid-token-123'; // This should match your backend token

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`
  }
});

// API service functions
export const taskService = {
  // Get all tasks
  async getTasks(): Promise<Task[]> {
    const response: AxiosResponse<ApiResponse<Task[]>> = await api.get('/tasks');
    if (response.data.status === 'success') {
      return response.data.data || [];
    }
    throw new Error(response.data.message || 'Failed to fetch tasks');
  },

  // Create a new task
  async createTask(task: TaskPayload): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await api.post('/task', task);
    if (response.data.status === 'success') {
      return response.data.message || 'Task created successfully';
    }
    throw new Error(response.data.message || 'Failed to create task');
  },

  // Update task status (completed/not completed)
  async updateTaskStatus(id: number, completed: boolean): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await api.post('/task/status', {
      id,
      completed
    });
    if (response.data.status === 'success') {
      return response.data.message || 'Task status updated successfully';
    }
    throw new Error(response.data.message || 'Failed to update task status');
  },

  // Update task details
  async updateTask(id: number, task: TaskPayload & { completed: boolean }): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await api.post('/task/update', {
      id,
      ...task
    });
    if (response.data.status === 'success') {
      return response.data.message || 'Task updated successfully';
    }
    throw new Error(response.data.message || 'Failed to update task');
  },

  // Delete a task
  async deleteTask(id: number): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await api.delete(`/task/delete?id=${id}`);
    if (response.data.status === 'success') {
      return response.data.message || 'Task deleted successfully';
    }
    throw new Error(response.data.message || 'Failed to delete task');
  },

  // Search tasks
  async searchTasks(query: string): Promise<Task[]> {
    const response: AxiosResponse<ApiResponse<Task[]>> = await api.get(`/task/search?q=${encodeURIComponent(query)}`);
    if (response.data.status === 'success') {
      return response.data.data || [];
    }
    throw new Error(response.data.message || 'Failed to search tasks');
  }
};

export default api;
