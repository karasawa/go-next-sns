package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/models"
)

type UsernameRequest struct {
	Username string `json:"username"`
}

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

func GetMyChats(ctx *gin.Context) {
	db := models.DbInit()

	chats := []models.Chat{}
	user := UsernameRequest{}

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err})
		ctx.Abort()
		return
	}

	result := db.Where("username = ?", user.Username).Find(&chats)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"chats": chats,
	})
}

func DeleteChat(ctx *gin.Context) {
	db := models.DbInit()

	chat := models.Chat{}
	id := ctx.Param("ID")
	result := db.Where("id = ?", id).Delete(&chat)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"chat": chat,
	})
}