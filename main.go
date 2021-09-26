package main

import (
	"log"

	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/handlers"
)

func main() {
	if db.CheckingConnection() == 0 {
		log.Fatal("No connection to database")
		return
	}
	handlers.Urls()
}