package com.example.ecommerce.auth.service;

import com.example.ecommerce.auth.dto.AuthResponse;
import com.example.ecommerce.auth.dto.LoginRequest;
import com.example.ecommerce.auth.dto.RegisterRequest;
import com.example.ecommerce.config.JwtUtils;
import com.example.ecommerce.user.entity.Role;
import com.example.ecommerce.user.entity.User;
import com.example.ecommerce.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    /**
     * Xử lý nghiệp vụ Đăng ký tài khoản
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // 1. Kiểm tra xem email đã tồn tại trong Database chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng!");
        }

        // 2. Mã hóa mật khẩu trước khi lưu vào DB
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 3. Tạo đối tượng User mới và lưu vào DB
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(encodedPassword)
                .role(Role.USER)
                .phone(request.getPhone())
                .address(request.getAddress())
                .isActive(true)
                .build();
        User savedUser = userRepository.save(user);

        // 4. Tạo JWT Token
        String token = jwtUtils.generateToken(savedUser.getEmail());

        // 5. Trả về AuthResponse cho Client
        return AuthResponse.builder()
                .token(token)
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .build();
    }

    /**
     * Xử lý nghiệp vụ Đăng nhập
     */
    public AuthResponse login(LoginRequest request) {
        // 1. Xác thực email & password thông qua Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. Tìm user trong Database để lấy thông tin
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại!"));

        // 3. Tạo JWT Token
        String token = jwtUtils.generateToken(user.getEmail());

        // 4. Đóng gói dữ liệu và trả về AuthResponse
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .build();
    }
}
