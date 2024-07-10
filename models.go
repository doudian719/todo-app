package main

type Task struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Notes     string `json:"notes"`
	Completed bool   `json:"completed"`
}

func getTasks() ([]Task, error) {
	rows, err := db.Query("SELECT id, title, notes, completed FROM tasks ORDER BY completed, id")
	if err != nil {
		return nil, err
	}

	defer rows.Close() // close connection at end of getTasks func

	tasks := []Task{}
	for rows.Next() {
		var task Task

		// Scan current row and insert data in each of these pointers
		if err := rows.Scan(&task.ID, &task.Title, &task.Notes, &task.Completed); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	return tasks, nil
}

// This func has a return type of error
func createTask(title, notes string) error {
	_, err := db.Exec("INSERT INTO tasks (title, notes, completed) VALUES (?, ?, ?)", title, notes, false)
	return err
}

func updateTaskStatus(id int, completed bool) error {
	_, err := db.Exec("UPDATE tasks SET completed = ? WHERE id = ?", completed, id)
	return err
}

func updateTask(id int, title, notes string, completed bool) error {
	_, err := db.Exec("UPDATE tasks SET title = ?, notes = ?, completed = ? WHERE id = ?", title, notes, completed, id)
	return err
}

func deleteTask(id int) error {
	_, err := db.Exec("DELETE FROM tasks WHERE id = ?", id)
	return err
}

func searchTasks(query string) ([]Task, error) {
	rows, err := db.Query("SELECT id, title, notes, completed FROM tasks WHERE title LIKE ? OR notes LIKE ?", "%"+query+"%", "%"+query+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	tasks := []Task{}
	for rows.Next() {
		var task Task
		if err := rows.Scan(&task.ID, &task.Title, &task.Notes, &task.Completed); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	return tasks, nil
}
