package db

import (
	"context"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
ReadUsersInfo reads all the users registered on the system, if you type "J" you will get all the users registered with a "J" on their name that
are related to you
*/

func ReadUsersInfo(ID string, page int64, search string, searchType string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("users")

	var results []*models.User

	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)
	// i is for ignore upper and lowercase
	query := bson.M{
		"name": bson.M{"$regex": `(?i)` + search},
	}

	cur, err := col.Find(ctx, query, findOptions)

	if err != nil {
		// fmt.Println(err.Error())
		return results, false
	}
	var found, include bool

	for cur.Next(ctx) {
		var s models.User
		err := cur.Decode(&s)
		if err != nil {
			//  fmt.Println(err.Error())
			return results, false
		}

		var r models.Relation
		r.UserID = ID
		r.UserRelationID = s.ID.Hex() // isolate ID

		include = false

		found, _ = CheckIfRelationExists(r)
		if searchType == "new" && !found { // if new then we want to list the new users that we have not included already
			include = true
		}
		if searchType == "follow" && found { // if follow that means we want a list of ONLY the users that we already follow
			include = true
		}

		if r.UserRelationID == ID {
			include = false
		}

		if include {
			s.Password = ""
			s.Biography = ""
			s.Location = ""
			s.Website = ""
			s.Banner = ""
			s.Email = ""

			results = append(results, &s) // go to s pointer that is pointing to the User model and bring everything else
		}
	}
	err = cur.Err()
	if err != nil {
		// fmt.Println(err.Error())
		return results, false
	}
	cur.Close(ctx)
	return results, true
}
