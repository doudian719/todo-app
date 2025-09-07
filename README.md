# Todo App - 任务管理应用

一个现代化的全栈任务管理应用，使用Go语言作为后端，React + TypeScript作为前端。

## 功能特性

### 后端功能
- ✅ RESTful API设计
- ✅ SQLite数据库存储
- ✅ JWT认证（简化版）
- ✅ CORS支持
- ✅ 静态文件服务

### 前端功能
- ✅ 现代化React + TypeScript界面
- ✅ 响应式设计，支持移动端
- ✅ 任务CRUD操作
- ✅ 实时搜索功能
- ✅ 任务状态筛选
- ✅ 优先级管理
- ✅ 截止日期提醒
- ✅ 逾期任务标识

## 技术栈

### 后端
- **Go 1.23+**
- **SQLite** - 轻量级数据库
- **标准库** - 无外部依赖

### 前端
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Axios** - HTTP客户端
- **Lucide React** - 图标库
- **date-fns** - 日期处理

## 快速开始

### 1. 安装依赖

#### 后端依赖
```bash
go mod tidy
```

#### 前端依赖
```bash
npm install
```

### 2. 启动应用

#### 方式一：分别启动（推荐用于开发）

1. 启动后端服务器：
```bash
go run .
```

2. 启动前端开发服务器：
```bash
npm start
```

访问 http://localhost:3000 查看前端界面

#### 方式二：构建并集成启动

1. 构建前端：
```bash
npm run build
```

2. 启动后端（会自动服务前端文件）：
```bash
go run .
```

访问 http://localhost:8080 查看完整应用

## API 接口

所有API接口都需要在请求头中包含认证token：

```
Authorization: Bearer valid-token-123
```

### 任务管理

- `GET /api/tasks` - 获取所有任务
- `POST /api/task` - 创建新任务
- `POST /api/task/status` - 更新任务状态
- `POST /api/task/update` - 更新任务详情
- `DELETE /api/task/delete?id={id}` - 删除任务
- `GET /api/task/search?q={query}` - 搜索任务

### 请求示例

#### 创建任务
```bash
curl -X POST http://localhost:8080/api/task \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer valid-token-123" \
  -d '{
    "title": "完成项目文档",
    "notes": "编写API文档和用户手册",
    "due_date": "2024-01-15",
    "priority": 2
  }'
```

#### 更新任务状态
```bash
curl -X POST http://localhost:8080/api/task/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer valid-token-123" \
  -d '{
    "id": 1,
    "completed": true
  }'
```

## 项目结构

```
todo-app/
├── main.go              # 主程序入口
├── handlers.go          # API处理器
├── models.go            # 数据模型和数据库操作
├── database.go          # 数据库初始化
├── middleware.go        # 中间件（认证、CORS）
├── go.mod              # Go模块配置
├── tasks.db            # SQLite数据库文件
├── package.json        # Node.js依赖配置
├── tsconfig.json       # TypeScript配置
├── tailwind.config.js  # Tailwind CSS配置
├── public/             # 静态文件
│   └── index.html
└── src/                # React源代码
    ├── components/     # React组件
    │   ├── TaskCard.tsx
    │   ├── TaskForm.tsx
    │   ├── SearchBar.tsx
    │   ├── FilterBar.tsx
    │   └── EmptyState.tsx
    ├── services/       # API服务
    │   └── api.ts
    ├── types/          # TypeScript类型定义
    │   └── index.ts
    ├── App.tsx         # 主应用组件
    ├── App.css         # 样式文件
    ├── index.tsx       # React入口
    └── index.css       # 全局样式
```

## 开发说明

### 数据库
应用使用SQLite数据库，数据库文件为`tasks.db`。首次运行时会自动创建数据库表和结构。

### 认证
当前使用简化的token认证，有效token为`valid-token-123`。在生产环境中应该使用更安全的认证机制。

### 前端开发
- 使用`npm start`启动开发服务器
- 支持热重载
- 自动打开浏览器

### 构建部署
- 使用`npm run build`构建生产版本
- 构建文件位于`build/`目录
- 后端会自动服务构建的前端文件

## 许可证

MIT License