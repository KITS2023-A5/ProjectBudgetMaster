package com.example.kits.groupa.budgetmaster.payload.response;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Currency;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfo {
    private String name;
    private String username;
    private String email;
    @Lob
    private byte[] image;
    private Currency currency;
}
