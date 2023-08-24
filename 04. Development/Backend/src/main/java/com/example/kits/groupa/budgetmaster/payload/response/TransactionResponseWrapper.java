package com.example.kits.groupa.budgetmaster.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Data
public class TransactionResponseWrapper {
    private Long totalCount;
    private List<BudgetResponse> budgets;
}
