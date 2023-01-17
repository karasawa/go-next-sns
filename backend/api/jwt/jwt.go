package jwt

import (
	"github.com/karasawa/go-next-sns.git/config"
	"errors"
	"time"
	"github.com/dgrijalva/jwt-go"
)

type JwtClaim struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

func GenerateJWT(email string) (tokenString string, err error) {
	cfg, _ := config.Load()
	var jwtKey = []byte(cfg.Jwt.SecretKey)
	expirationTime := time.Now().Add(1 * time.Hour)
	claims:= &JwtClaim{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString(jwtKey)
	return
}

func ValidateToken(signedToken string) (err error) {
	cfg, _ := config.Load()
	var jwtKey = []byte(cfg.Jwt.SecretKey)

	token, err := jwt.ParseWithClaims(
		signedToken,
		&JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtKey), nil
		},
	)
	if err != nil {
		return
	}
	claims, ok := token.Claims.(*JwtClaim)
	if !ok {
		err = errors.New("couldn't parse claims")
		return
	}
	if claims.ExpiresAt < time.Now().Local().Unix() {
		err = errors.New("token expired")
		return
	}
	return
}