package routers

import (
	"encoding/json"
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
)

/*
SignUp is the function to create a new user in the db
*/

func SignUp(w http.ResponseWriter, r *http.Request) {
	var t models.User
	err := json.NewDecoder(r.Body).Decode(&t)

	if err != nil {
		http.Error(w, "There was an error on the received data" + err.Error(),400)
		return
	}

	if len(t.Email) == 0 {
		http.Error(w, "Email is required", 400)
		return
	}
	if len(t.Password) < 6 {
		http.Error(w, "Password is too short, minimum length is 6", 400)
		return
	}
	_, found, _ := db.CheckIfUserExists(t.Email)
	if found == true {
		http.Error(w, "Email already exists", 400)
		return
	}

	_, status, err := db.InsertUser(t)
	if err != nil {
		http.Error(w, "There was an error when creating the user"+err.Error(), 400)
		return
	}
	if status == false {
		http.Error(w, "It was not possible to create the user", 400)
		return
	}
	w.WriteHeader(http.StatusCreated)
}