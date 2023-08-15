package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.dto.UserRegister;
import com.example.kits.groupa.budgetmaster.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    @Autowired

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegister userRegister) {
        this.userService.registerNewUser(userRegister);
        return ResponseEntity.ok().body("Your account has been created!");
    }

}
