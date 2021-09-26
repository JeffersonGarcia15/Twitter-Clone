package main

import (
	"log"

	"github.com/JeffersonGarcia15/db"
	"github.com/JeffersonGarcia15/handlers"
)

func main() {
	if db.ConnectDB() == 0 {
		log.Fatal("No connection to database")
		return
	}
	handlers.Urls()
}