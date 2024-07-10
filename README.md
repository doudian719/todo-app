# Golang To-Do List Application

## Overview

This is a simple To-Do List application implemented in Go (Golang). The application allows users to manage tasks with features such as creating, updating, deleting tasks, and persisting data in an SQLite database. It includes authentication to ensure that only authorized users can access the task management functionality.

## Features

- **Create Tasks:** Add new tasks with a title and optional notes.
- **Update Tasks:** Modify existing tasks' title, notes, completion status, due date, and priority.
- **Delete Tasks:** Remove tasks by their ID.
- **List Tasks:** Retrieve all tasks with incomplete tasks listed first, followed by completed tasks.
- **Search Tasks:** Find tasks by title or notes.
- **Authentication:** Secure access to endpoints with token-based authentication.

## Getting Started

### Prerequisites

- **Go**: Ensure you have Go installed. You can download it from [the official Go website](https://golang.org/dl/).
- **SQLite**: The application uses SQLite as the database. It comes bundled with the `github.com/mattn/go-sqlite3` package.

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/todo-list.git
   cd todo-list
   ```

2. **Initialize the Go Module**

   If the `go.mod` file does not exist, initialize a new Go module:

   ```sh
   go mod init todo-list
   ```

3. **Get Dependencies**

   Install the required dependencies:

   ```sh
   go get github.com/mattn/go-sqlite3
   ```

4. **Build the Application**

   Build the application to ensure everything is set up correctly:

   ```sh
   go build
   ```

5. **Run the Application**

   Start the server:

   ```sh
   go run main.go
   ```

   The server will start on `http://localhost:8080`.

### API Endpoints

#### 1. **Get All Tasks**

   **Endpoint:** `/tasks`  
   **Method:** `GET`  
   **Description:** Retrieves all tasks with incomplete tasks listed first, followed by completed tasks.

   **Example Request:**

   ```sh
   curl -X GET http://localhost:8080/tasks -H "Authorization: Bearer valid-token-123"
   ```

   **Response:**

   ```json
   [
       {
           "id": 1,
           "title": "Buy groceries",
           "notes": "Milk, Bread, Eggs",
           "completed": false
       },
       {
           "id": 2,
           "title": "Read book",
           "notes": "Finish reading 'Golang Programming'",
           "completed": false
       },
       {
           "id": 3,
           "title": "Pay bills",
           "notes": "Electricity and Water",
           "completed": true
       }
   ]
   ```

#### 2. **Create a New Task**

   **Endpoint:** `/task`  
   **Method:** `POST`  
   **Description:** Creates a new task with a title and optional notes.

   **Example Request:**

   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{
       "title": "Clean the house",
       "notes": "Living room and kitchen",
       "due_date": "2024-08-01",
       "priority": 1
   }' http://localhost:8080/task -H "Authorization: Bearer valid-token-123"
   ```

   **Response:**

   ```json
    [
        {
            "status":"success",
            "data":"Task created successfully"
        }
    ]
   ```

#### 3. **Update a Task**

   **Endpoint:** `/task/update`  
   **Method:** `POST`  
   **Description:** Updates an existing task's title, notes, completion status, due date, and priority.

   **Example Request:**

   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{
       "id": 1,
       "title": "Buy groceries and cook dinner",
       "notes": "Milk, Bread, Eggs, and Chicken",
       "completed": true,
       "due_date": "2024-07-15",
       "priority": 2
   }' http://localhost:8080/task/update -H "Authorization: Bearer valid-token-123"
   ```

   **Response:**

   ```json
    [
        {
            "status":"success",
            "data":"Task updated successfully"
        }
    ]
   ```

#### 4. **Update a Task's Completion Status**

   **Endpoint:** `/task/status`  
   **Method:** `POST`  
   **Description:** Updates an existing task's completion status only.

   **Example Request:**

   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{
       "id": 1,
       "completed": true,
   }' http://localhost:8080/task/status -H "Authorization: Bearer valid-token-123"
   ```

   **Response:**

   ```json
    [
        {
            "status":"success",
            "data":"Task status updated successfully"
        }
    ]
   ```

#### 5. **Delete a Task**

   **Endpoint:** `/task/delete`  
   **Method:** `GET`  
   **Description:** Deletes a task by its ID.

   **Example Request:**

   ```sh
   curl -X GET "http://localhost:8080/task/delete?id=1" -H "Authorization: Bearer valid-token-123"
   ```

   **Response:**

   ```json
    [
        {
            "status":"success",
            "data":"Task deleted successfully"
        }
    ]
   ```

#### 6. **Search Tasks**

   **Endpoint:** `/task/search`  
   **Method:** `GET`  
   **Description:** Searches for tasks by title or notes.

   **Example Request:**

   ```sh
   curl -X GET "http://localhost:8080/task/search?q=book" -H "Authorization: Bearer valid-token-123"
   ```

   **Response:**

   ```json
   [
       {
           "id": 2,
           "title": "Read book",
           "notes": "Finish reading Golang Programming",
           "completed": false
       }
   ]
   ```

### Authentication

To access the API endpoints, include a valid token in the `Authorization` header. The token should be prefixed with `Bearer`.

**Example Header:**
```sh
Authorization: Bearer valid-token-123
```

**Predefined Valid Token:**
- `valid-token-123`

### Project Structure

```
todo-list/
├── go.mod
├── go.sum
├── main.go
├── handlers.go
├── middleware.go
├── models.go
├── database.go
```
