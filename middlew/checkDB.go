package middlew

import (
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)

/*
CheckDB is the middleware that allows me to check the status of the db
*/

func CheckDB(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if db.CheckingConnection() == 0 {
			http.Error(w, "Connection lost with db", 500)
			return
		}
		next.ServeHTTP(w, r)
	}

}