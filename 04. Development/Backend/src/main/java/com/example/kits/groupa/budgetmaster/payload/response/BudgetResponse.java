package com.example.kits.groupa.budgetmaster.payload.response;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class BudgetResponse {
    private int budgetId;

    private String description;
    private double amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Category category;
    private Long userId;
}
