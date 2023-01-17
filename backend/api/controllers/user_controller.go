package controllers

import (
	"net/http"
	"log"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/karasawa/go-next-sns.git/models"
)

func SignUp(ctx *gin.Context) {
	db := models.DbInit()

	user := models.User{}
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		ctx.Abort()
		return
	}

	if err := user.HashPassword(user.Password); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		ctx.Abort()
		return
	}

	result := db.Create(&user)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func SignIn(ctx *gin.Context) {
	db := models.DbInit()
	var errMes string

	user := models.User{}
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	result := db.Where("Email = ?", user.Email).Where("Password = ?", user.Password).First(&user)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		log.Println(result.Error)
		fmt.Println(result.Error)
		errMes = "record not found"
	}
	ctx.JSON(http.StatusOK, gin.H{
		"user": user,
		"errMes": errMes,
	})
}

func User(ctx *gin.Context) {
	head := ctx.Request.Header["Authrization"]
	ctx.JSON(http.StatusOK, gin.H{
		"head": head,
	})
}

func Ping(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"message": "pong"})
}