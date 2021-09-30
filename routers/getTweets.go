package routers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)


/*
GetTweets is in charge of geting the tweet from the request
*/

func GetTweets(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must send the id parameter", http.StatusBadRequest)
		return
	}
	if len(r.URL.Query().Get("pagination")) < 1 {
		http.Error(w, "You must send the pagination parameter", http.StatusBadRequest)
		return
	}
	page, err := strconv.Atoi(r.URL.Query().Get("pagination"))
	if err != nil {
		http.Error(w, "You must send the pagination parameter with a value greater than 0", http.StatusBadRequest)
		return
	}
	pag := int64(page)
	response, correct := db.GetTweets(ID, pag)
	if !correct {
		http.Error(w, "An error occurred when getting the tweets", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

