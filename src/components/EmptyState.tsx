import React from 'react';
import { CheckSquare, Search, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-tasks' | 'no-search-results' | 'no-filtered-results';
  searchQuery?: string;
  filterType?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, searchQuery, filterType }) => {
  const getContent = () => {
    switch (type) {
      case 'no-tasks':
        return {
          icon: CheckSquare,
          title: '还没有任务',
          description: '点击右上角的"添加任务"按钮开始创建您的第一个任务',
          iconColor: 'text-gray-400',
          iconBg: 'bg-gray-100'
        };
      case 'no-search-results':
        return {
          icon: Search,
          title: '没有找到匹配的任务',
          description: `没有找到包含"${searchQuery}"的任务，请尝试其他关键词`,
          iconColor: 'text-gray-400',
          iconBg: 'bg-gray-100'
        };
      case 'no-filtered-results':
        return {
          icon: AlertCircle,
          title: '没有符合条件的任务',
          description: `当前筛选条件下没有任务，请尝试其他筛选条件`,
          iconColor: 'text-gray-400',
          iconBg: 'bg-gray-100'
        };
      default:
        return {
          icon: CheckSquare,
          title: '暂无数据',
          description: '当前没有可显示的内容',
          iconColor: 'text-gray-400',
          iconBg: 'bg-gray-100'
        };
    }
  };

  const { icon: Icon, title, description, iconColor, iconBg } = getContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mb-4`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
