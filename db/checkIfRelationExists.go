package db

import (
	"context"
	"time"
	"fmt"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
)

/*
CheckIfUserExists checks if there is a relation between two users
*/

// Works as suggested users feature follow ? btn.unfollow : btn.follow
func CheckIfRelationExists(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("joins")

	condition := bson.M{
		"userid": t.UserID,
		"userrelationid": t.UserRelationID,
	}

	var result models.Relation
	// fmt.Println(result)
	err := col.FindOne(ctx, condition).Decode(&result)
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}
	return true, nil
}