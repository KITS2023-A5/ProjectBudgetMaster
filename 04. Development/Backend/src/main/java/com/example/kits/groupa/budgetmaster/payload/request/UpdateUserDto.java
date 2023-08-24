package com.example.kits.groupa.budgetmaster.payload.request;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Currency;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Gender;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UpdateUserDto {
    private String name;
    private String phoneNumber;
    private Gender gender;
    private Currency currency;
    private LocalDate dob;
}