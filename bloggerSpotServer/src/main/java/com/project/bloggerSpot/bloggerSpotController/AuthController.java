package com.project.bloggerSpot.bloggerSpotController;

import com.project.bloggerSpot.entity.UserEntity;
import com.project.bloggerSpot.model.UserDto;
import com.project.bloggerSpot.services.JwtService;
import com.project.bloggerSpot.services.UserRequestHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final UserRequestHandler userRequestHandler;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto user) {
        try {
            // Authenticate
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getConfirmPassword())
            );

            // Generate token
            UserEntity existingUser = userRequestHandler.getUserByEmail(user.getEmail());
            String token = jwtService.generateToken(existingUser);

            // Return simple Map - NO NEW CLASSES NEEDED
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "jwt", token,
                    "message", "Login successful"
            ));

        } catch (BadCredentialsException e) {
            // Return error Map - NO NEW CLASSES NEEDED
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "success", false,
                            "error", "Invalid email or password"
                    ));

        } catch (DisabledException e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Map.of(
                            "success", false,
                            "error", "Account disabled"
                    ));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "error", "Authentication failed"
                    ));
        }
    }
}
