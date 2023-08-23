package com.example.kits.groupa.budgetmaster.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserIncomeResponse {
    private Long userId;
    private String username;
    private double income;
    private double expense;
}
