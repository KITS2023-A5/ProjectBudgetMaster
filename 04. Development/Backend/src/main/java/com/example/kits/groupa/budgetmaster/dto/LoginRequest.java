package com.example.kits.groupa.budgetmaster.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class LoginRequest {
    private String usernameOrEmail;
    private String password;
}
