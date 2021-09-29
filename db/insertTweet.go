package db

import (
	"context"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

)

/*
InsertTweet saves a record of a tweet in the database.
*/

func InsertTweet(t models.RecordTweet) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("tweets")

	register := bson.M{
		"userid": t.UserID,
		"body": t.Body,
		"date": t.Date,
	}
	result, err := col.InsertOne(ctx, register)
	if err != nil {
		return string(""), false, err 
	}
	objID, _ := result.InsertedID.(primitive.ObjectID)
	return objID.String(), true, nil
}