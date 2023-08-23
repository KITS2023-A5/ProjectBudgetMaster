package com.example.kits.groupa.budgetmaster.payload.response;

import com.example.kits.groupa.budgetmaster.repositories.TransactionProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
public class SummaryResponse {
    private int month;
    private int year;
    private double totalIncome;
    private double totalExpense;
    private double totalSavings;

    private List<TransactionProjection> transactions;
}
