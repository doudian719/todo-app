// Task interface matching the backend model
export interface Task {
  id: number;
  title: string;
  notes: string;
  completed: boolean;
  due_date: string;
  priority: number;
}

// API response structure
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

// Task creation/update payload
export interface TaskPayload {
  title: string;
  notes: string;
  due_date: string;
  priority: number;
}

// Task status update payload
export interface TaskStatusUpdate {
  id: number;
  completed: boolean;
}

// Priority levels
export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4
}

// Filter types
export type FilterType = 'all' | 'pending' | 'completed' | 'overdue';

// Priority labels for display
export const PriorityLabels: Record<Priority, string> = {
  [Priority.LOW]: '低',
  [Priority.MEDIUM]: '中',
  [Priority.HIGH]: '高',
  [Priority.URGENT]: '紧急'
};

// Priority colors for UI
export const PriorityColors: Record<Priority, string> = {
  [Priority.LOW]: 'bg-green-100 text-green-800',
  [Priority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [Priority.HIGH]: 'bg-orange-100 text-orange-800',
  [Priority.URGENT]: 'bg-red-100 text-red-800'
};
