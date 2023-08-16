package com.example.kits.groupa.budgetmaster.payload.request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LoginRequest {
    private String username;
    private String password;
}