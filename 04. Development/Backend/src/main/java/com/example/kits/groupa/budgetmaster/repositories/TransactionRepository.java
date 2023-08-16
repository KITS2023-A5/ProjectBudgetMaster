package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>{

    @Query("SELECT t FROM Transaction t WHERE t.user.userId = :userId")
    List<Transaction> findByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.transactionId=:transactionId and t.user.userId = :userId")
    Transaction findByTransactionIdAndUserId(@Param("transactionId")Integer transactionId, @Param("userId") Long userId);
}
