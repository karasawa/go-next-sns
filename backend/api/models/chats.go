package models

import (
	"gorm.io/gorm"
)

type Chat struct {
	gorm.Model
	Username string `json:"username"`
	Message string `json:"message"`
}