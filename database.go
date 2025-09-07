package main

import (
	"database/sql"
	"log"
	"sync"

	_ "modernc.org/sqlite" // comment: pure-Go sqlite
)

var (
	db   *sql.DB
	once sync.Once
)

func initDB() {
	once.Do(func() {
		var err error
		db, err = sql.Open("sqlite", "./tasks.db")
		if err != nil {
			log.Fatalf("Could not open database: %s\n", err.Error())
		}

		createTableQuery := `
		CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT,
			notes TEXT,
			completed BOOLEAN,
			due_date TEXT,
			priority INTEGER
		);`
		_, err = db.Exec(createTableQuery)
		if err != nil {
			log.Fatalf("Could not create table: %s\n", err.Error())
		}
	})
}
