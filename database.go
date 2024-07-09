package main

import (
	"database/sql"
	"log"
	"sync"

	_ "github.com/mattn/go-sqlite3"
)

var (
	db   *sql.DB
	once sync.Once
)

func initDB() {
	once.Do(func() {
		var err error
		db, err = sql.Open("sqlite3", "./tasks.db")
		if err != nil {
			log.Fatalf("Could not open database: %s\n", err.Error())
		}

		createTableQuery := `
		CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT,
			notes TEXT,
			completed BOOLEAN
		);`
		_, err = db.Exec(createTableQuery)
		if err != nil {
			log.Fatalf("Could not create table: %s\n", err.Error())
		}
	})
}
