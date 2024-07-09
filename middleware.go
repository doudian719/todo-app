package main

import (
	"net/http"
	"strings"
)

var validTokens = map[string]bool{
	"valid-token-123": true,
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" || !validTokens[strings.TrimPrefix(token, "Bearer ")] {
			sendErrorResponse(w, http.StatusUnauthorized, "Unauthorized")
			return
		}
		next.ServeHTTP(w, r)
	})
}
