package models

/*
Relation model is used to save the relation(as done in psql) between one user and another one
*/

type Relation struct {
	UserID 		   string `bson:"userid" json:"userId,omitempty"`
	UserRelationID string `bson:"userrelationid" json:"userRelationId,omitempty"`
}