package com.example.kits.groupa.budgetmaster.entities;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Currency;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Gender;
import com.example.kits.groupa.budgetmaster.entities.enumeration.UserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String password;
    private String username;
    private String email;

    @Lob
    private byte[] image;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate dob;

    private String activationToken;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String name, String password, String username, String email, String phone, Gender gender, LocalDate dob) {
        this.name = name;
        this.password = password;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.dob = dob;
    }
}
