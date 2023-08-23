package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Reminder;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.repositories.ReminderRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReminderService {
    private final ReminderRepository reminderRepository;
    private final UserRepository userRepository;

    public ReminderService(ReminderRepository reminderRepository, UserRepository userRepository) {
        this.reminderRepository = reminderRepository;
        this.userRepository = userRepository;
    }

    public Reminder createReminder(Reminder reminder, Long userId) {
        Reminder newReminder = new Reminder();
        newReminder.setDescription(reminder.getDescription());
        newReminder.setDueDate(reminder.getDueDate());
        User user = userRepository.findById(userId).get();
        newReminder.setUser(user);
        return reminderRepository.save(newReminder);
    }

    public Reminder updateReminder(Long reminderId, Reminder updateReminder, Long userId) {
        Reminder reminder = reminderRepository.findById(reminderId).get();
        if(updateReminder.getDescription() != null){
            reminder.setDescription(updateReminder.getDescription());
        }
        if(updateReminder.getDueDate() != null){
            reminder.setDueDate(updateReminder.getDueDate());
        }
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getRemindersWithinDays(int days, Long userId) {
        LocalDate currentDate = LocalDate.now();
        LocalDate endDate = currentDate.plusDays(days);
        return reminderRepository.findRemindersWithinDays(endDate, userId);
    }
}
