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

    @Lob
    private byte[] receipt;

    private Type type;

    private int categoryId;
}
