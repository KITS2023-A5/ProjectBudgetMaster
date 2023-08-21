package com.example.kits.groupa.budgetmaster.payload.request;

import com.example.kits.groupa.budgetmaster.entities.enumeration.ERole;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Gender;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class SignupRequest {
    private String username;
    private String name;
    private String email;
    private String password;
    private String phone;
    private Date dob;
    private Gender gender;
    private Set<String> role;

}
