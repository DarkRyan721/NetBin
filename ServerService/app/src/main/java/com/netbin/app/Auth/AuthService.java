package com.netbin.app.Auth;

import com.netbin.app.Jwt.JwtService;
import com.netbin.app.User.Role;
import com.netbin.app.User.User;
import com.netbin.app.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserDetails user = userRepository.findByUsername(request.email()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder().
            token(token).
            build();
    }

    public AuthResponse register(RegisterRequest request) {
        logger.info("Register Request: {}", request);
        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .firstname(request.firstname())
                .lastname(request.lastname())
                .role(Role.USER)
                .build();
            userRepository.save(user);
            logger.info("Usuario guardado exitosamente: {}", user.getUsername());
            return AuthResponse.builder()
                    .token(jwtService.getToken(user))  // Verifica si esto retorna null
                    .state("Usuario guardado correctamente")
                    .build();
    }
}
