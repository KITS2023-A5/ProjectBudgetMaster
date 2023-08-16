package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.payload.request.UpdatePasswordRequest;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateUserDto;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import com.example.kits.groupa.budgetmaster.util.NullAwareBeanUtilsBean;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User updateUser(Long userId, UpdateUserDto updateUserDto) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Update the relevant properties from the DTO
            user.setName(updateUserDto.getName());
            user.setEmail(updateUserDto.getEmail());
            // Copy non-null properties from updateUserDto to user
            try {
                BeanUtilsBean notNull = new NullAwareBeanUtilsBean();
                notNull.copyProperties(user, updateUserDto);
            } catch (IllegalAccessException | InvocationTargetException e) {
                // Handle any exceptions that occur during property copying
                // You can log the exception or throw a custom exception as needed
            }

            // Save the updated user to the database
            userRepository.save(user);

            return user;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }

    @Transactional
    public void updatePassword(Long userId, UpdatePasswordRequest request) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            String currentPassword = request.getCurrentPassword();
            String newPassword = request.getNewPassword();
            String confirmPassword = request.getConfirmPassword();

            // Check if the current password matches the user's existing password
            if (passwordEncoder.matches(currentPassword, user.getPassword())) {
                // Check if the new password and confirm password match
                if (newPassword.equals(confirmPassword)) {
                    // Set the user's new password
                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password and confirm password do not match");
                }
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid current password");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }
}