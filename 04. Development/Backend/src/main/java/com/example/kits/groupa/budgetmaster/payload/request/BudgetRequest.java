package com.example.kits.groupa.budgetmaster.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Setter
@Getter
public class BudgetRequest {
    private String description;
    private double amount;
    private Date startDate;
    private Date endDate;

    private int categoryId;
}
