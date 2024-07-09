package main

import (
	"log"
	"net/http"
)

func main() {
	// Init db
	initDB()

	// Define routes and handlers
	http.Handle("/tasks", authMiddleware(http.HandlerFunc(getTasksHandler)))
	http.Handle("/task", authMiddleware(http.HandlerFunc(createTaskHandler)))
	http.Handle("/task/status", authMiddleware(http.HandlerFunc(updateTaskStatusHandler)))
	http.Handle("/task/update", authMiddleware(http.HandlerFunc(updateTaskHandler)))
	http.Handle("/task/delete", authMiddleware(http.HandlerFunc(deleteTaskHandler)))

	log.Println("Starting server on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
