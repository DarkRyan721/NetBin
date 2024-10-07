package com.netbin.app.Auth;

import lombok.*;

public record LoginRequest(String email, String password) {
}