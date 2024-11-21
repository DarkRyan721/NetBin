package com.netbin.app.User;

import com.netbin.app.Jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/info")
    public ResponseEntity<UserDTO> getAuthenticatedUser(@RequestHeader("Authorization") String token) {
        // Extraer el token sin el prefijo "Bearer"
        String jwtToken = token.replace("Bearer ", "");
        String username = jwtService.getUsernameFromToken(jwtToken);

        // Buscar el usuario en la base de datos
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        String coBins = user.getCoBins() != null ? user.getCoBins().toString() : "0";
        // Crear un DTO con los datos del usuario
        UserDTO userDTO = new UserDTO(
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getRole().name(),
                coBins
        );

        return ResponseEntity.ok(userDTO);
    }

    /**
     * Endpoint para incrementar los CoBins del usuario autenticado.
     *
     * @param token     Token de autorización en el encabezado.
     * @param increment Cantidad a incrementar en los CoBins.
     * @return Respuesta con el nuevo total de CoBins.
     */

    @PostMapping("/cobins")
    public ResponseEntity<String> incrementCoBins(
            @RequestHeader("Authorization") String token,
            @RequestBody IncrementRequest increment) {

        // Extraer el token sin el prefijo "Bearer"
        String jwtToken = token.replace("Bearer ", "");
        String username = jwtService.getUsernameFromToken(jwtToken);

        // Buscar el usuario en la base de datos
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Incrementar los CoBins
        Integer currentCoBins = user.getCoBins() != null ? user.getCoBins() : 0;
        Integer newCoBins = currentCoBins + increment.getAmount();
        user.setCoBins(newCoBins);

        // Guardar los cambios en la base de datos
        userRepository.save(user);

        return ResponseEntity.ok("CoBins incrementados. Nuevo total: " + newCoBins);
    }
}
