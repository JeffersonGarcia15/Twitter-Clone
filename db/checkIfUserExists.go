package db

import (
	"context"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
)

func CheckIfUserExists(email string) (models.User, bool, string) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("users")

	condition := bson.M{"email": email}

	var result models.User

	err := col.FindOne(ctx, condition).Decode(&result)
	ID := result.ID.Hex()

	if err != nil {
		return result, false, ID
	}
	return result, true, ID
}