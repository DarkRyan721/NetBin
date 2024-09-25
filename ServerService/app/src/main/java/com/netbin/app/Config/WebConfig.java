package com.netbin.app.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permitir todas las rutas
                .allowedOrigins("https://netbin.vercel.app")  // Permitir solicitudes de Vercel
                .allowedOrigins("https://web.postman.co/")
                .allowedOrigins("http://localhost/")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Métodos permitidos
                        .allowedHeaders("*")  // Permitir todos los encabezados
                        .allowCredentials(true);  // Permitir el uso de cookies o tokens
    }
}