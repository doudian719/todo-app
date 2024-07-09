package main

import (
	"log"
	"net/http"
)

func main() {
	// Init db
	initDB()

	// Define routes and handlers
	http.HandleFunc("/tasks", getTasksHandler)
	http.HandleFunc("/task", createTaskHandler)
	http.HandleFunc("/task/status", updateTaskStatusHandler)
	http.HandleFunc("/task/update", updateTaskHandler)
	http.HandleFunc("/task/delete", deleteTaskHandler)

	log.Println("Starting server on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
