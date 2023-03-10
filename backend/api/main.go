package main

import (
	"io"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/controllers"
	"github.com/karasawa/go-next-sns.git/middlewares"
	"github.com/karasawa/go-next-sns.git/models"
)

func init() {
	models.DbInit()
}

func main() {
	f, _ := os.OpenFile("apl.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	defer f.Close()
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	r := initRouter()
	r.Run(":8080")
}

func initRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
			"PUT",
			"DELETE",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"X-CSRF-Token",
			"Authorization",
		},
		AllowOrigins: []string{
			"*",
		},
	}))
	api := r.Group("/api")
	{
		api.POST("/token", controllers.GenerateToken)
		api.POST("/user/signup", controllers.SignUp)
		secured := api.Group("/secured").Use(middlewares.Auth())
		{
			secured.POST("/chat/create", controllers.SendChat)
			secured.POST("/chat/delete/:ID", controllers.DeleteChat)
			secured.GET("/chat/get/messages", controllers.GetChats)
			secured.POST("/chat/get/my/messages", controllers.GetMyChats)
			secured.POST("/profile", controllers.GetMyProfile)
			secured.POST("/upload", controllers.Upload)
		}
	}
	return r
}
