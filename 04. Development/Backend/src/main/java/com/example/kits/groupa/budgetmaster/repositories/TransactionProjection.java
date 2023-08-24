package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;

import java.time.LocalDateTime;

public interface TransactionProjection {
    int getTransactionId();
    double getAmount();
    String getDescription();
    LocalDateTime getCreatedTime();
    LocalDateTime getUpdatedTime();
    byte[] getReceipt();
    Category getCategory();
}
