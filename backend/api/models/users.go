package models

import (
	"gorm.io/gorm"
)


type User struct {
	gorm.Model
	Name string `json:"name"`
	Email string `json:"name"`
	Password string `json:"name"`
}