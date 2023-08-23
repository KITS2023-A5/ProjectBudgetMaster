package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Role;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.ERole;
import com.example.kits.groupa.budgetmaster.payload.response.UserIncomeResponse;
import com.example.kits.groupa.budgetmaster.repositories.CategoryRepository;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class AdminStatisticsService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AdminStatisticsService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public List<UserIncomeResponse> calculateIncomeAndExpenseByUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        Set<Role> roles = user.getRoles();


        boolean isAdmin = roles.stream()
                .anyMatch(role -> role.getName().equals(ERole.ROLE_ADMIN));

        if (isAdmin) {
            List<Object[]> results = transactionRepository.calculateIncomeAndExpenseByUser();
            List<UserIncomeResponse> UserIncomeResponses = new ArrayList<>();

            for (Object[] result : results) {
                Long id = (Long) result[0];
                String username = (String) result[1];
                double income = (double) result[2];
                double expense = (double) result[3];

                UserIncomeResponse UserIncomeResponse = new UserIncomeResponse(id, username, income, expense);
                UserIncomeResponses.add(UserIncomeResponse);
            }

            return UserIncomeResponses;
        }
        else{
            throw new AccessDeniedException("Access denied");
        }
    }
}
