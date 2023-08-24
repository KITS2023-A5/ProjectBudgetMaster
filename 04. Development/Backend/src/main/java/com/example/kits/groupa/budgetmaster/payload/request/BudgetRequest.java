package com.example.kits.groupa.budgetmaster.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Setter
@Getter
public class BudgetRequest {
    private String description;
    private double amount;
    private LocalDate startDate;
    private LocalDate endDate;

    private int categoryId;
}
