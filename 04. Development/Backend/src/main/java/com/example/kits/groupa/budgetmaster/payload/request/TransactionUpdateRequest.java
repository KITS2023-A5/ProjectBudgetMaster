package com.example.kits.groupa.budgetmaster.payload.request;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionUpdateRequest {
    private Double amount;
    private String description;
    private String receipt;
    private int categoryId;
}
