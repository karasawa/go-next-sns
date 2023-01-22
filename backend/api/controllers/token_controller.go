package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/jwt"
	"github.com/karasawa/go-next-sns.git/models"
)

type TokenRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

func GenerateToken(ctx *gin.Context) {
	db := models.DbInit()
	var request TokenRequest
	var user models.User
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		ctx.Abort()
		return
	}

	result := db.Where("Email = ?", request.Email).First(&user)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		ctx.Abort()
		return
	}

	credentialError := user.CheckPassword(request.Password)
	if credentialError != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		ctx.Abort()
		return
	}

	tokenString, err:= jwt.GenerateJWT(user.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		ctx.Abort()
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"token": tokenString, "user": user})
}