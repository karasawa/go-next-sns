package controllers

import (
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/models"
)

func SignUp(ctx *gin.Context) {
	db := models.DbInit()

	user := models.User{}
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	result := db.Create(&user)
	if result.Error != nil {
		log.Fatalln(result.Error)
	}
}

func GetUser(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}