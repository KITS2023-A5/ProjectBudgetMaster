package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Reminder;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.ReminderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user/reminder")
public class ReminderController {
    private final JwtUtils jwtUtils;
    private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService, JwtUtils jwtUtils) {
        this.reminderService = reminderService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping
    public ResponseEntity<Reminder> createReminder(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Reminder reminder) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        return ResponseEntity.ok(reminderService.createReminder(reminder, userId));
    }

    @PutMapping("/{reminderId}")
    public ResponseEntity<Reminder> updateReminder(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long reminderId, @RequestBody Reminder reminder) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        return ResponseEntity.ok(reminderService.updateReminder(reminderId, reminder, userId));
    }

    @GetMapping("/within/{days}")
    public ResponseEntity<?> getRemindersWithinDays(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int days) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        return ResponseEntity.ok(reminderService.getRemindersWithinDays(days, userId));
    }
}
