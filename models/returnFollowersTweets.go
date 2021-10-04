package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReturnFollowersTweets struct {
	ID             primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	UserID         string             `bson:"userid" json:"userId,omitempty"`
	UserRelationID string             `bson:"userrelationid" json:"userRelationId,omitempty"`
	Tweets          struct {
		Body string    `bson:"body" json:"body,omitempty"`
		Date time.Time `bson:"date" json:"date,omitempty"`
		ID   string    `bson:"_id" json:"_id,omitempty"`
	}
}
