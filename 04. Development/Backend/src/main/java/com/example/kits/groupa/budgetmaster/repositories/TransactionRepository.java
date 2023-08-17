package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
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

    @Query("SELECT t FROM Transaction t WHERE t.user.userId = :userId")
    List<Transaction> findByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.transactionId=:transactionId and t.user.userId = :userId")
    Transaction findByTransactionIdAndUserId(@Param("transactionId")Integer transactionId, @Param("userId") Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.type = :type and t.user.userId = :userId")
    List<Transaction> findAllByType(@Param("type") Type type, @Param("userId") Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.category.name LIKE %:category% and t.user.userId = :userId")
    List<Transaction> findAllByCategoryName(@Param("category") String category, @Param("userId") Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.category.categoryId = :categoryId and t.user.userId = :userId")
    List<Transaction> findAllByCategory(@Param("categoryId") int categoryId, @Param("userId") Long userId);
}
