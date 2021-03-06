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
	if !exists {
		http.Error(w, "User or password incorrect " , 400)
		return
	}

	jwtKey, err := jwt.GenerateJWT(document)

	if err != nil {
		http.Error(w, "An error was encountered while generating the JWT "+err.Error(), 400)
		return
	}

	response := models.LoginResponse {
		Token: jwtKey,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)

	expirationTime := time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &http.Cookie{
		Name: "token",
		Value: jwtKey,
		Expires: expirationTime,
	})
}

