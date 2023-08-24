package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.PasswordResetToken;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.UserStatus;
import com.example.kits.groupa.budgetmaster.exception.NotFoundException;
import com.example.kits.groupa.budgetmaster.payload.request.UpdatePasswordRequest;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateUserDto;
import com.example.kits.groupa.budgetmaster.payload.response.UserInfo;
import com.example.kits.groupa.budgetmaster.repositories.PasswordResetTokenRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final JavaMailSender mailSender;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, PasswordResetTokenRepository passwordResetTokenRepository, JavaMailSender mailSender){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.mailSender = mailSender;
    }

    public UserInfo getUserInfo(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new UserInfo(user.getName(), user.getUsername(), user.getEmail(), user.getImage(), user.getCurrency(), user.getGender(), user.getDob(), user.getPhone());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }

    @Transactional
    public void updateUser(Long userId, UpdateUserDto updateUserDto) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Update the relevant properties from the DTO
            if (updateUserDto.getName() != null)
                user.setName(updateUserDto.getName());
            if (updateUserDto.getPhoneNumber() != null)
                user.setPhone(updateUserDto.getPhoneNumber());
            if (updateUserDto.getCurrency() != null)
                user.setCurrency(updateUserDto.getCurrency());
            if(updateUserDto.getGender() != null)
                user.setGender(updateUserDto.getGender());
            if(updateUserDto.getDob() != null)
                user.setDob(updateUserDto.getDob());
            // Save the updated user to the database
            userRepository.save(user);

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

    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new NotFoundException("User not found with email: " + email);
        }

        // Generate a unique token
        String token = UUID.randomUUID().toString();

        // Create and save the password reset token
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(24)); // Set the expiry date/time
        passwordResetTokenRepository.save(resetToken);

        // Send the token to the user via email
        sendPasswordResetEmail(user.getEmail(), token);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new NotFoundException("Invalid or expired token");
        }

        User user = resetToken.getUser();
        // Update the user's password with the new password
        user.setPassword(passwordEncoder.encode(newPassword));

        // Save the updated user
        userRepository.save(user);

        // Delete the used password reset token
        passwordResetTokenRepository.delete(resetToken);

        sendPasswordResetNotificationEmail(user.getEmail());
    }

    private void sendPasswordResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, please click on the following link: "
                + "http://45.117.179.168:8080/api/user/reset-password?token=" + token);

        mailSender.send(message);
    }

    private void sendPasswordResetNotificationEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Successful");
        message.setText("Your password has been successfully reset.");

        mailSender.send(message);
    }

    public void deactivateUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserStatus(UserStatus.DISABLED);
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }
}