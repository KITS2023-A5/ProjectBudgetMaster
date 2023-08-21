package com.example.kits.groupa.budgetmaster.payload.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ExpenseStatistics {
    private String timePeriod;
    private Double expense;
}
