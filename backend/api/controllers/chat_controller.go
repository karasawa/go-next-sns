package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/models"
)


func SendChat(ctx *gin.Context) {
	db := models.DbInit()

	chat := models.Chat{}
	if err := ctx.ShouldBindJSON(&chat); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		ctx.Abort()
		return
	}

	result := db.Create(&chat)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"chat": chat,
	})

}

func GetChats(ctx *gin.Context) {
	db := models.DbInit()

	chats := []models.Chat{}
	result := db.Find(&chats)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"chats": chats,
	})
}