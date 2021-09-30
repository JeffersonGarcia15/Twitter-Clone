package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*
ReturnTweets is the struct used to return tweets
*/

type ReturnTweets struct {
	ID primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	UserID string `bson:"userid" json:"userid,omitempty"`
	Body string `bson:"body" json:"body,omitempty"`
	Date time.Time `bson:"date" json:"date,omitempty"`
}