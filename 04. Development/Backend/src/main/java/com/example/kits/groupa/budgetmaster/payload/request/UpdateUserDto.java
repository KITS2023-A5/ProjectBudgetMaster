package com.example.kits.groupa.budgetmaster.payload.request;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Currency;
import lombok.Getter;

@Getter
public class UpdateUserDto {
    private String name;
    private String username;
    private String email; 
    private Currency currency;
}