package com.example.kits.groupa.budgetmaster.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;

    // Add getters and setters
}
