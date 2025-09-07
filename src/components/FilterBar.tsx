import React from 'react';
import { Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export type FilterType = 'all' | 'pending' | 'completed' | 'overdue';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
    overdue: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all' as FilterType, label: '全部', icon: Filter, count: taskCounts.all },
    { key: 'pending' as FilterType, label: '待完成', icon: Clock, count: taskCounts.pending },
    { key: 'completed' as FilterType, label: '已完成', icon: CheckCircle, count: taskCounts.completed },
    { key: 'overdue' as FilterType, label: '已逾期', icon: AlertCircle, count: taskCounts.overdue },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {filters.map(({ key, label, icon: Icon, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeFilter === key
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
