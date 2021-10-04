package db

import (
	"context"
	"time"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
)

/*
ReadFollowersTweets reads the tweets from my followers
*/

func ReadFollowersTweets(ID string, page int) ([]models.ReturnFollowersTweets, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("joins")

	skip := (page - 1) * 20

	conditions := make([]bson.M, 0)
	conditions = append(conditions, bson.M{"$match": bson.M{"userid": ID}})
	conditions = append(conditions, bson.M{
		"$lookup": bson.M{
			"from": "tweets",
			"localField": "userrelationid",
			"foreignField": "userid",
			"as": "tweets",
		},
	})
	conditions = append(conditions, bson.M{"unwind": "$tweets"})//allows all the info to be repeated with the same structure for all tweets on same page
	conditions = append(conditions, bson.M{"$sort": bson.M{"tweets.date": -1}})
	conditions = append(conditions, bson.M{"$skip": skip})
	conditions = append(conditions, bson.M{"$limit": 20})

	cursor, _ := col.Aggregate(ctx, conditions)
	var results []models.ReturnFollowersTweets

	err := cursor.All(ctx, &results)
	if err != nil {
		return results, false
	}
	return results, true

}