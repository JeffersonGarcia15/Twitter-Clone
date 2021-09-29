package models

import "time"

type Tweet struct {
	UserID string `bson:"userid" json:"userid,omitempty"`
	Body string `bson:"body" json:"body,omitempty"`
	Date time.Time `bson:"date" json:"date,omitempty"`

}