package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Budget;
import com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.visible=true")
    Page<BudgetResponse> findBudgetsByUserId(Long userId, Pageable pageable);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.budgetId = :budgetId AND b.user.userId = :userId")
    Budget findByBudgetIdAndUserId(Integer budgetId, Long userId);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.category.categoryId = :categoryId AND b.visible=true")
    Page<BudgetResponse> findBudgetsByCategory(Long userId, Integer categoryId, Pageable pageable);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.category.name LIKE %:categoryName% AND b.visible=true")
    Page<BudgetResponse> findBudgetsByCategoryName(Long userId, String categoryName, Pageable pageable);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.startDate >= :startDate AND b.endDate <= :endDate AND b.visible=true")
    Page<BudgetResponse> findBudgetsBetweenDates(Long userId, String startDate, String endDate, Pageable pageable);
}
