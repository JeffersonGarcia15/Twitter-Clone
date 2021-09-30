package db

import  (
	"context"
	"time"
	"log"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

)


func GetTweets(ID string, pagination int64) ([]*models.ReturnTweets, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("tweets")

	var results []*models.ReturnTweets

	condition := bson.M{
		"userid": ID,
	}

	optionsVar := options.Find()
	optionsVar.SetLimit(20)
	optionsVar.SetSort(bson.D{{Key: "date", Value: -1}})//-1 for Descending
	// (1-1)*20=0 so no skips on tweets on the first page, (2-1) * 20 = 20 so skips first 20
	optionsVar.SetSkip((pagination - 1) * 20)//first page is 20 Tweets, the next one will skips the first 20, the next one will skip the first 40...
	cursor, err := col.Find(ctx, condition, optionsVar)
	if err != nil {
		log.Fatal(err.Error())
		return results, false
	}
	
	for cursor.Next(context.TODO()) {
		var register models.ReturnTweets

		err := cursor.Decode(&register)//cursor is a JSON obj
		if err != nil {
			return results, false
		}
		results = append(results, &register)
	}
	return results, true
}