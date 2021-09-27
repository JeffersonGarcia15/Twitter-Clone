package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/jwt"

)

/*
Login is the function to login
*/

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)

	if err != nil {
		http.Error(w, "User or password incorrect "+err.Error(), 400)
		return
	}
	if len(t.Email) == 0 {
		http.Error(w, "Email is required " , 400)
		return
	}
	document, exists := db.LoginAttempt(t.Email, t.Password) 
	if exists == false {
		http.Error(w, "User or password incorrect " , 400)
		return
	}
	
}

