package com.example.kits.groupa.budgetmaster.payload.request;

import com.example.kits.groupa.budgetmaster.entities.enumeration.ERole;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    private String username;
    private String name;
    private String email;
    private String password;
    private Set<String> role;

}
