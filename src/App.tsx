import React, { useState, useEffect, useMemo } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Task, FilterType } from './types';
import { taskService } from './services/api';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from API
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载任务失败');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search tasks
  const searchTasks = async (query: string) => {
    if (!query.trim()) {
      loadTasks();
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const searchResults = await taskService.searchTasks(query);
      setTasks(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索失败');
      console.error('Error searching tasks:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchTasks(searchQuery);
      } else {
        loadTasks();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    if (searchQuery.trim()) {
      return tasks; // When searching, show all search results
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      switch (activeFilter) {
        case 'completed':
          return task.completed;
        case 'pending':
          return !task.completed;
        case 'overdue':
          if (task.completed || !task.due_date) return false;
          try {
            const dueDate = new Date(task.due_date);
            return dueDate < now;
          } catch {
            return false;
          }
        case 'all':
        default:
          return true;
      }
    });
  }, [tasks, activeFilter, searchQuery]);

  // Calculate task counts for filter bar
  const taskCounts = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return {
      all: tasks.length,
      pending: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
      overdue: tasks.filter(task => {
        if (task.completed || !task.due_date) return false;
        try {
          const dueDate = new Date(task.due_date);
          return dueDate < now;
        } catch {
          return false;
        }
      }).length
    };
  }, [tasks]);

  // Handle task creation
  const handleCreateTask = async (taskData: any) => {
    try {
      await taskService.createTask(taskData);
      await loadTasks(); // Reload tasks after creation
    } catch (err) {
      throw err; // Re-throw to let TaskForm handle the error
    }
  };

  // Handle task update
  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;
    
    try {
      await taskService.updateTask(editingTask.id, {
        ...taskData,
        completed: editingTask.completed
      });
      await loadTasks(); // Reload tasks after update
    } catch (err) {
      throw err; // Re-throw to let TaskForm handle the error
    }
  };

  // Handle task status toggle
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await taskService.updateTaskStatus(id, completed);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, completed } : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新任务状态失败');
      console.error('Error updating task status:', err);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('确定要删除这个任务吗？')) return;

    try {
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除任务失败');
      console.error('Error deleting task:', err);
    }
  };

  // Handle form operations
  const handleOpenCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Handle search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadTasks();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">加载任务中...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-medium text-red-800 mb-2">加载失败</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadTasks}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">任务管理</h1>
              <p className="text-gray-600 mt-1">高效管理您的日常任务</p>
            </div>
            <button
              onClick={handleOpenCreateForm}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>添加任务</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            taskCounts={taskCounts}
          />
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <EmptyState
              type={
                searchQuery.trim()
                  ? 'no-search-results'
                  : activeFilter !== 'all'
                    ? 'no-filtered-results'
                    : 'no-tasks'
              }
              searchQuery={searchQuery}
              filterType={activeFilter}
            />
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEditForm}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        title={editingTask ? '编辑任务' : '添加任务'}
      />
    </div>
  );
}

export default App;
