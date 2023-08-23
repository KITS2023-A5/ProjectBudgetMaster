package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long>{
    @Query("SELECT r FROM Reminder r WHERE r.dueDate <= :endDate AND r.user.userId = :userId")
    List<Reminder> findRemindersWithinDays(@Param("endDate") LocalDate endDate, @Param("userId") Long userId);
}
