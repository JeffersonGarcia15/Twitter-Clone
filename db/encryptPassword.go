package db
import "golang.org/x/crypto/bcrypt"

/*
EncryptPassword is in charge of encrypting a password and securing it instead of storing it as plain text with the actual password
*/

func EncryptPassword(pass string) (string, error) {
	salt := 8 
	bytes, err := bcrypt.GenerateFromPassword([]byte(pass), salt)
	return string(bytes), err
}

