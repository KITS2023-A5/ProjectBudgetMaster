package com.example.kits.groupa.budgetmaster.payload.request;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionRequest {
    private double amount;
    private String description;
    private Type type;
    private int categoryId;
    private Long userId;
}
