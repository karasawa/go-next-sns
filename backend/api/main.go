package main

import (
	"os"
	"io"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/karasawa/go-next-sns.git/models"
	"github.com/karasawa/go-next-sns.git/controllers"
)

func init() {
	models.DbInit()
}

func main() {
	f, _ := os.OpenFile("apl.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	defer f.Close()
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)

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
		MaxAge: 24 * time.Hour,
	  }))
	
	r.POST("/signup", controllers.SignUp)
	user := r.Group("/user")
	{
		user.GET("/get", controllers.GetUser)
	}
	r.Run(":8080")
}