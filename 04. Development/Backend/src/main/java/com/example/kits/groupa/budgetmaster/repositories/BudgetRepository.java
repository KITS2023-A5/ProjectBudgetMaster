package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Budget;
import com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId")
    List<BudgetResponse> findBudgetsByUserId(Long userId, Pageable pageable);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.category.categoryId = :categoryId")
    List<BudgetResponse> findBudgetsByCategory(Long userId, Integer categoryId, Pageable pageable);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.category.name LIKE %:categoryName%")
    List<BudgetResponse> findBudgetsByCategoryName(Long userId, String categoryName, Pageable pageable);

    @Query("SELECT new com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse(b.budgetId, b.description, b.amount, b.startDate, b.endDate, b.category, b.user.userId) " +
            "FROM Budget b " +
            "WHERE b.user.userId = :userId AND b.startDate >= :startDate AND b.endDate <= :endDate")
    List<BudgetResponse> findBudgetsBetweenDates(Long userId, String startDate, String endDate, Pageable pageable);
}
