package routers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)

/*
ReadFollowersTweets reads the tweets of all our followers
*/

func ReadFollowersTweets(w http.ResponseWriter, r *http.Request) {
	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "You must send a page number", http.StatusBadRequest)
		return
	}
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "You must send a page number as an int greater than 0", http.StatusBadRequest)
		return
	}
	response, correct := db.ReadFollowersTweets(IDUser, page)
	if !correct {
		http.Error(w, "An error occurred when reading the tweets", http.StatusBadRequest)
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

