package routers

import (
	"encoding/json"
	"net/http"

	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)

/*
Profile allows us to extract information from the profile
*/

func Profile(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must send the ID parameter", http.StatusBadRequest)
		return
	}
	profile, err := db.SearchProfile(ID)
	if err != nil {
		http.Error(w, "An error occurred when searching for the user "+err.Error(), 400)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}