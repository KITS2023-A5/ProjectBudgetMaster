package com.example.kits.groupa.budgetmaster.payload.response;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionInfo {
    private double amount;
    private String description;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    private String receipt;

    private int categoryId;
    private Long userId;

    public TransactionInfo(double amount, String description, LocalDateTime createdTime, int categoryId, Long userId) {
        this.amount = amount;
        this.description = description;
        this.createdTime = createdTime;
        this.categoryId = categoryId;
        this.userId = userId;
    }
}
