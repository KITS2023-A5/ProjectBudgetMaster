package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Budget;
import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.payload.request.BudgetRequest;
import com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse;
import com.example.kits.groupa.budgetmaster.repositories.BudgetRepository;
import com.example.kits.groupa.budgetmaster.repositories.CategoryRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public BudgetResponse createBudget(Long userId, BudgetRequest budgetRequest){
        Category category = categoryRepository.findById(budgetRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid categoryId"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid userId"));
        Budget budget = new Budget();
        budget.setDescription(budgetRequest.getDescription());
        budget.setAmount(budgetRequest.getAmount());
        budget.setStartDate(budgetRequest.getStartDate());
        budget.setEndDate(budgetRequest.getEndDate());
        budget.setCategory(category);
        budget.setUser(user);
        budgetRepository.save(budget);
        return new BudgetResponse(budget.getBudgetId(), budget.getDescription(), budget.getAmount(), budget.getStartDate(), budget.getEndDate(), budget.getCategory(), budget.getUser().getUserId());
    }

    public BudgetResponse updateBudget(Long userId, Integer budgetId, BudgetRequest budgetRequest){
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new IllegalArgumentException("Budget not found"));
        if (!Objects.equals(budget.getUser().getUserId(), userId)) {
            throw new IllegalArgumentException("User not found");
        }
        Category category = categoryRepository.findById(budgetRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        budget.setDescription(budgetRequest.getDescription());
        budget.setAmount(budgetRequest.getAmount());
        budget.setStartDate(budgetRequest.getStartDate());
        budget.setEndDate(budgetRequest.getEndDate());
        budget.setCategory(category);
        budgetRepository.save(budget);
        return new BudgetResponse(budget.getBudgetId(), budget.getDescription(), budget.getAmount(), budget.getStartDate(), budget.getEndDate(), budget.getCategory(), budget.getUser().getUserId());
    }



    public List<BudgetResponse> getBudgetsByUserId(Long userId, Pageable pageable){
        return budgetRepository.findBudgetsByUserId(userId, pageable);
    }

    public List<BudgetResponse> getBudgetsByCategory(Long userId, Integer categoryId, Pageable pageable){
        return budgetRepository.findBudgetsByCategory(userId, categoryId, pageable);
    }

    public List<BudgetResponse> getBudgetsByCategoryName(Long userId, String categoryName, Pageable pageable){
        return budgetRepository.findBudgetsByCategoryName(userId, categoryName, pageable);
    }

    public List<BudgetResponse> getBudgetsBetweenDates(Long userId, String startDate, String endDate, Pageable pageable){
        return budgetRepository.findBudgetsBetweenDates(userId, startDate, endDate, pageable);
    }
}
