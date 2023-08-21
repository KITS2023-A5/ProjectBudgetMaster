package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>{


    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, t.updatedTime AS updatedTime, t.receipt AS receipt FROM Transaction t WHERE t.user.userId = :userId")
    List<TransactionProjection> findByUserId(@Param("userId") Long userId, Pageable pageable);


    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, t.updatedTime AS updatedTime, t.receipt AS receipt FROM Transaction t WHERE t.category.name LIKE %:category% AND t.user.userId = :userId")
    List<TransactionProjection> findAllByCategoryName(@Param("category") String category, @Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, t.updatedTime AS updatedTime, t.receipt AS receipt FROM Transaction t WHERE t.category.categoryId = :categoryId AND t.user.userId = :userId")
    List<TransactionProjection> findAllByCategory(@Param("categoryId") int categoryId, @Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, t.updatedTime AS updatedTime, t.receipt AS receipt FROM Transaction t WHERE t.user.userId = :userId AND t.createdTime BETWEEN :start AND :end")
    List<TransactionProjection> findAllBetweenDates(LocalDateTime start, LocalDateTime end, Long userId, Pageable pageable);
}
