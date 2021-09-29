package models

/*
Tweet captures the body of the message that we get
*/

type Tweet struct {
	Body string `bson:"body" json:"body"`
}