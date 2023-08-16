package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.payload.request.UpdatePasswordRequest;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateUserDto;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final JwtUtils jwtUtils;
    private final UserService userService;

    public UserController(JwtUtils jwtUtils, UserService userService) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String authorizationHeader,
                                                @RequestBody UpdateUserDto userProfileDto) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        // Call the user service to update the profile
        userService.updateUser(userId, userProfileDto);

        return ResponseEntity.ok("Profile updated successfully");
    }


    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestHeader("Authorization") String authorizationHeader,
                                                @RequestBody UpdatePasswordRequest request) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        userService.updatePassword(userId, request);
        return ResponseEntity.ok("Password updated successfully");
    }
}