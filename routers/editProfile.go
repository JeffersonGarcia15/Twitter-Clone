package routers

import (
	"encoding/json"
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"

)

/*
EditProfile modifies a user's profile
*/

func EditProfile(w http.ResponseWriter, r *http.Request) {
	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "the data is invalid"+err.Error(), 400)
		return
	}

	var status bool
	status, err = db.EditRegister(t, IDUser)
	if err != nil {
		http.Error(w, "An error occurred when trying to modify the register. Please try again"+err.Error(), 400)
		return
	}
	if !status {
		http.Error(w, "It was not possible to modify the user's register in the db"+err.Error(), 400)
		return
	}
	w.WriteHeader(http.StatusCreated)
}