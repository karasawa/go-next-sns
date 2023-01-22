package controllers

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/models"
	"gorm.io/gorm"
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

func GetMyProfile(ctx *gin.Context) {
	db := models.DbInit()

	user := models.User{}
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err})
		ctx.Abort()
		return
	}

	result := db.Where("Email = ?", user.Email).Find(&user)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": user, 
	})
}

func Upload(ctx *gin.Context) {
	form, _ := ctx.MultipartForm()
	imageFile := form.File["imageFile"]

	ctx.JSON(http.StatusOK, gin.H{
		"imageFile": imageFile,
	})
}