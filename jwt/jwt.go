package jwt

import (
	"time"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"



)

/*
GenerateJWT generates the encryption with JWT
*/

// var dotenv = db.GoDotEnvVariable("MY_SECRET")

func GenerateJWT(t models.User) (string, error) {
	mySecret := []byte("learningaboutgobybuildingatwittercloneusingmongodb")

	payload := jwt.MapClaims{
		"email": t.Email,
		"name": t.Name,
		"Last": t.Last,
		"bod": t.Bod,
		"location": t.Location,
		"website": t.Website,
		"biography": t.Biography,
		"_id": t.ID.Hex(),
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString(mySecret)
	if err != nil {
		return tokenStr, err
	}
	return tokenStr, nil
}