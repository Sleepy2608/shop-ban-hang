package com.example.ecommerce.auth.controller;

import com.example.ecommerce.auth.dto.AuthResponse;
import com.example.ecommerce.auth.dto.LoginRequest;
import com.example.ecommerce.auth.dto.RegisterRequest;
import com.example.ecommerce.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth") // Vì context-path trong application.yml là /api nên đường dẫn thực tế sẽ là /api/auth
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * API Đăng ký tài khoản mới: POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * API Đăng nhập: POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * API Kiểm tra thông tin người dùng đang đăng nhập: GET /api/auth/me
     * (Cần truyền Bearer token trong Header để kiểm tra token có hợp lệ không)
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Chưa đăng nhập!");
        }
        return ResponseEntity.ok(authentication.getPrincipal());
    }
}
