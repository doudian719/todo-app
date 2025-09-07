package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// CORS middleware to handle cross-origin requests
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Static file server for serving the React app
func serveStaticFiles(w http.ResponseWriter, r *http.Request) {
	// Get the requested path
	path := r.URL.Path

	// If path is root or doesn't have an extension, serve index.html
	if path == "/" || !strings.Contains(filepath.Ext(path), ".") {
		path = "/index.html"
	}

	// Always try to serve from build directory first
	filePath := filepath.Join("build", path)

	// Check if file exists in build directory
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		// If not found in build, try public directory
		filePath = filepath.Join("public", path)
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			// If still not found, serve build/index.html for SPA routing
			filePath = filepath.Join("build", "index.html")
		}
	}

	// Log the file being served for debugging
	log.Printf("Serving file: %s", filePath)

	// Serve the file
	http.ServeFile(w, r, filePath)
}

func main() {
	// Init db
	initDB()

	// Define API routes with CORS
	http.Handle("/api/tasks", corsMiddleware(authMiddleware(http.HandlerFunc(getTasksHandler))))
	http.Handle("/api/task", corsMiddleware(authMiddleware(http.HandlerFunc(createTaskHandler))))
	http.Handle("/api/task/status", corsMiddleware(authMiddleware(http.HandlerFunc(updateTaskStatusHandler))))
	http.Handle("/api/task/update", corsMiddleware(authMiddleware(http.HandlerFunc(updateTaskHandler))))
	http.Handle("/api/task/delete", corsMiddleware(authMiddleware(http.HandlerFunc(deleteTaskHandler))))
	http.Handle("/api/task/search", corsMiddleware(authMiddleware(http.HandlerFunc(searchTasksHandler))))

	// Serve static files (React app)
	http.HandleFunc("/", serveStaticFiles)

	log.Println("Starting server on :8080...")
	log.Println("API endpoints available at /api/*")
	log.Println("Frontend will be served from /")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
