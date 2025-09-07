import React from 'react';
import { Task, Priority, PriorityLabels, PriorityColors } from '../types';
import { Check, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  // Format due date for display
  const formatDueDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MM月dd日', { locale: zhCN });
      }
    } catch (error) {
      console.error('Date parsing error:', error);
    }
    return null;
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.due_date || task.completed) return false;
    try {
      const dueDate = parseISO(task.due_date);
      return isValid(dueDate) && dueDate < new Date();
    } catch (error) {
      return false;
    }
  };

  const dueDate = formatDueDate(task.due_date);
  const overdue = isOverdue();

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 p-4 transition-all duration-200 hover:shadow-lg ${
      task.completed 
        ? 'border-l-gray-300 bg-gray-50' 
        : overdue 
          ? 'border-l-red-500' 
          : 'border-l-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={() => onToggleComplete(task.id, !task.completed)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <Check className="w-3 h-3" />}
            </button>
            
            <h3 className={`text-lg font-medium ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
          </div>

          {task.notes && (
            <p className={`text-sm mb-3 ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.notes}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm">
            {/* Priority Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              PriorityColors[task.priority as Priority] || 'bg-gray-100 text-gray-800'
            }`}>
              {PriorityLabels[task.priority as Priority] || '未知'}
            </span>

            {/* Due Date */}
            {dueDate && (
              <div className={`flex items-center space-x-1 ${
                overdue ? 'text-red-600' : 'text-gray-500'
              }`}>
                <Calendar className="w-4 h-4" />
                <span>{dueDate}</span>
                {overdue && <AlertCircle className="w-4 h-4" />}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="编辑任务"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="删除任务"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
