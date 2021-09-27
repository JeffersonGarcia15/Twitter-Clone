package db

import (
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"golang.org/x/crypto/bcrypt"
)

/*
LoginAttempt checks if the info in the db is correct in order to attempt to login
*/

func LoginAttempt(email string, password string) (models.User, bool) {
	user, found, _ := CheckIfUserExists(email)

	if found == false {
		return user, false
	}

	passwordBytes := []byte(password)
	passwordDB := []byte(user.Password)

	err := bcrypt.CompareHashAndPassword(passwordDB, passwordBytes)

	if err != nil {
		return user, false
	}
	return user, true
}