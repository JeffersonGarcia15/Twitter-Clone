package models

import "time"

/*
RecordTweet is the structure that our Tweet will have in the database.
*/

type RecordTweet struct {
	UserID string `bson:"userid" json:"userid,omitempty"`
	Body string `bson:"body" json:"body,omitempty"`
	Date time.Time `bson:"date" json:"date,omitempty"`

}