package middlew

import (
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/routers"

)

/*
ValidJWT allows us to validate the JWT that we get from the request
*/

func ValidJWT(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, _, err := routers.ProcessToken(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "There was an error on the Token"+err.Error(), http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)
	}
}