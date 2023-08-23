package com.example.kits.groupa.budgetmaster.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId;
    private String description;
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
}
