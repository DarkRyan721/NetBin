package com.netbin.app.Auth;

public record RegisterRequest(
        String username,
        String password,
        String email,
        String firstname,
        String lastname) {
}
