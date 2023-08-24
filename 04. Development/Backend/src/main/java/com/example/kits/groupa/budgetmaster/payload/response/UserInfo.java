package com.example.kits.groupa.budgetmaster.payload.response;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Currency;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Gender;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
public class UserInfo {
    private String name;
    private String username;
    private String email;
    @Lob
    private byte[] image;
    private Currency currency;
    private Gender gender;
    private LocalDate dob;
    private String phone;
}
