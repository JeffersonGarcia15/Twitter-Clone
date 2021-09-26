package db

import (
	"context"
	"time"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson/primitive"

)

/*
InsertUser is the final stop with the db to insert user data
*/
func InsertUser(u *models.User) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	
	db := MongoCN.Database("twitter")
	col := db.Collection("users")

	u.Password, _ = EncryptPassword(u.Password)

	result, err := col.InsertOne(ctx, u)

	if err != nil {
		return "", false, err
	}

	ObjID, _ := result.InsertedID.(primitive.ObjectID)
	return ObjID.String(), true, nil
}