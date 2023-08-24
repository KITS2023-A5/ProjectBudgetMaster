package com.example.kits.groupa.budgetmaster.payload.response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseUserCategory {
    private String username;
    private String categoryName;
    private double amount;
}
