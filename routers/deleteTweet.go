package routers

import (
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)

/*
DeleteTweet allows us to delete a specified tweet
*/

func DeleteTweet(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must send id parameter", http.StatusBadRequest)
		return
	}

	err := db.DeleteTweet(ID, IDUser)

	if err != nil {
		http.Error(w, "An error occurred when trying to delete a tweet "+err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}