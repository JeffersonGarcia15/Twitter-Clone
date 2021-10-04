package db

import (
	"context"
	"time"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
)

/*
DeleteRelation is in charge of deleting the joins relation of followers in the db
*/

func DeleteRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("joins")

	_, err := col.DeleteOne(ctx, t)
	if err != nil {
		return false, err
	}
	return true, nil
}