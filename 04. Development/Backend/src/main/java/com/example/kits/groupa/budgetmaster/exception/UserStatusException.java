package com.example.kits.groupa.budgetmaster.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserStatusException extends UsernameNotFoundException {
    public UserStatusException(String message) {
        super(message);
    }
}
