package com.example.kits.groupa.budgetmaster.entities;

import com.example.kits.groupa.budgetmaster.entities.enumeration.NotiStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;
    private String description;

    private NotiStatus notiStatus;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
}
