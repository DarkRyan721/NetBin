package com.netbin.app.User;

import com.netbin.app.Jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
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

//    @PostMapping("/increment-cobins")
//    public ResponseEntity<String> incrementCoBins(@RequestHeader("Authorization") String token, @RequestBody CoBinRequest coBinRequest) {
//        // Extraer el token sin el prefijo "Bearer"
//        String jwtToken = token.replace("Bearer ", "");
//        String username = jwtService.getUsernameFromToken(jwtToken);
//
//        // Buscar el usuario en la base de datos
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
//
//        // Incrementar los coBins
//        Integer currentCoBins = user.getCoBins() != null ? user.getCoBins() : 0;
//        Integer newCoBins = currentCoBins + coBinRequest.getAmount();
//        user.setCoBins(newCoBins);
//
//        // Guardar el nuevo valor en la base de datos
//        userRepository.save(user);
//
//        return ResponseEntity.ok("CoBins incrementados. Nuevo total: " + newCoBins);
//    }
}
