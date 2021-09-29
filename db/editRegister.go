package db

import (
	"context"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

)

/*
EditUser allows us to edit the information of a user on the db
*/

func EditRegister(u models.User, ID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("users")

	info := make(map[string]interface{})

	if len(u.Name) > 0 {
		info["name"] = u.Name
	}
	if len(u.Last) > 0 {
		info["last"] = u.Last
	}
	info["bod"] = u.Bod
	if len(u.Avatar) > 0 {
		info["avatar"] = u.Avatar
	}
	if len(u.Banner) > 0 {
		info["banner"] = u.Banner
	}
	if len(u.Biography) > 0 {
		info["biography"] = u.Biography
	}
	if len(u.Location) > 0 {
		info["location"] = u.Location
	}
	if len(u.Website) > 0 {
		info["website"] = u.Website
	}
	// We use interface because of the different structures. You cant really use json because you cannot add conditionals inside of it

	//To update in Mongo
	updtString := bson.M{
		"$set": info,
	}

	objID, _ := primitive.ObjectIDFromHex(ID)
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	_, err := col.UpdateOne(ctx, filter, updtString)

	if err != nil {
		return false, err
	}
	return true, nil
}