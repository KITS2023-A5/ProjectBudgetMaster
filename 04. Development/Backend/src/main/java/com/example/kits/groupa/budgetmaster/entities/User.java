package com.example.kits.groupa.budgetmaster.entities;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Currency;
import com.example.kits.groupa.budgetmaster.entities.enumeration.UserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String name;
    private String password;
    private String username;
    private String email;

    @Lob
    private byte[] image;

    private UserStatus userStatus;
    private Currency currency;

}
