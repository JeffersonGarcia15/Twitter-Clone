package routers

import (
	"errors"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"

)

/*
ProcessToken process the token to extract the information
*/
// var dotenv = db.GoDotEnvVariable("MY_SECRET")

/*
Email is the Email value in all endpoints
*/

var Email string

/*
ID is the ID value in all endpoints
*/

var IDUser string

func ProcessToken(tk string) (*models.Claim, bool, string, error) {
	mySecret := []byte("learningaboutgobybuildingatwittercloneusingmongodb")

	claims := &models.Claim{}

	splitToken := strings.Split(tk, "Bearer")
	if len(splitToken) != 2 {
		return claims, false, string(""), errors.New("invalid token format")
	}
	tk = strings.TrimSpace(splitToken[1])

	tkn, err := jwt.ParseWithClaims(tk, claims, func(token *jwt.Token)(interface{}, error) {
		return mySecret, nil
	})

	if err == nil {
		_, found, _ := db.CheckIfUserExists(claims.Email)
		if found {
			Email = claims.Email
			IDUser = claims.ID.Hex()
		}
		return claims, found, IDUser, nil
	}
	if !tkn.Valid {
		return claims, false, string(""), errors.New("invalid token")
	}
	return claims, false, string(""), err
}