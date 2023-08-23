package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>{

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type " +
            "FROM Transaction t " +
            "WHERE t.user.userId = :userId and t.visible=true")
    List<TransactionProjection> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type " +
            "FROM Transaction t " +
            "WHERE t.user.userId = :userId and t.visible=true")
    List<TransactionProjection> findByUserId(@Param("userId") Long userId);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type " +
            "FROM Transaction t " +
            "WHERE t.user.userId = :userId AND t.category.type = 'EXPENSE' AND t.visible=true")
    List<TransactionProjection> findAllExpenseByUserId(Long userId);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type " +
            "FROM Transaction t " +
            "WHERE t.category.name LIKE %:category% AND t.user.userId = :userId AND t.visible=true")
    List<TransactionProjection> findAllByCategoryName(@Param("category") String category, @Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type FROM Transaction t " +
            "WHERE t.category.categoryId = :categoryId AND t.user.userId = :userId AND t.visible=true")
    List<TransactionProjection> findAllByCategory(@Param("categoryId") int categoryId, @Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type " +
            "FROM Transaction t " +
            "WHERE t.user.userId = :userId AND t.createdTime BETWEEN :start AND :end AND t.visible=true")
    List<TransactionProjection> findAllBetweenDates(LocalDateTime start, LocalDateTime end, Long userId, Pageable pageable);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type " +
            "FROM Transaction t " +
            "WHERE t.user.userId = :userId AND t.createdTime BETWEEN :start AND :end AND t.visible=true order by t.createdTime desc")
    List<TransactionProjection> findAllBetweenDates(LocalDateTime start, LocalDateTime end, Long userId);

    @Query("SELECT t from Transaction t WHERE t.transactionId= :transactionId AND t.user.userId = :userId AND t.visible=true")
    Transaction findByTransactionIdAndUserId(int transactionId, Long userId);

    @Query("SELECT t.transactionId AS transactionId, t.amount AS amount, t.description AS description, t.createdTime AS createdTime, " +
            "t.updatedTime AS updatedTime, t.receipt AS receipt, t.category.type AS type FROM Transaction t " +
            "WHERE t.category.type = :type AND t.user.userId = :userId AND t.visible=true")
    List<TransactionProjection> findTransactionByType(Type type, Long userId, Pageable pageable);

    @Query(value = "SELECT DATE_FORMAT(created_time, '%d-%m-%Y') as timePeriod, sum(amount) as expense FROM transaction t " +
            "JOIN category c ON t.category_id = c.category_id " +
            "WHERE t.user_id = :userId AND c.type = 'EXPENSE' AND t.visible = true " +
            "group by DATE_FORMAT(created_time, '%d-%m-%Y') "+
            "order by timePeriod desc "
            , nativeQuery = true)
    List<Object[]> findExpenseByUserDaily(Long userId);

    @Query(value = "SELECT DATE_FORMAT(created_time, '%V-%X') as timePeriod, sum(amount) as expense FROM transaction t " +
            "JOIN category c ON t.category_id = c.category_id " +
            "WHERE t.user_id = :userId AND c.type = 'EXPENSE' AND t.visible = true " +
            "group by DATE_FORMAT(created_time, '%V-%X') "+
            "order by timePeriod desc "
            , nativeQuery = true)
    List<Object[]> findExpenseByUserWeekly(Long userId);

    @Query(value = "SELECT DATE_FORMAT(t.created_time, '%m-%Y') AS timePeriod, SUM(t.amount) AS expense FROM transaction t " +
            "JOIN category c ON t.category_id = c.category_id " +
            "WHERE t.user_id = :userId AND c.type = 'EXPENSE' AND t.visible = true " +
            "GROUP BY DATE_FORMAT(t.created_time, '%m-%Y') " +
            "ORDER BY timePeriod DESC", nativeQuery = true)
    List<Object[]> findExpenseByUserMonthly(Long userId);

    @Query(value = "SELECT DATE_FORMAT(t.created_time, '%Y') AS timePeriod, SUM(t.amount) AS expense FROM transaction t " +
            "JOIN category c ON t.category_id = c.category_id " +
            "WHERE t.user_id = :userId AND c.type = 'EXPENSE' AND t.visible = true " +
            "GROUP BY DATE_FORMAT(t.created_time, '%Y') " +
            "ORDER BY timePeriod DESC", nativeQuery = true)
    List<Object[]> findExpenseByUserYearly(Long userId);

    @Query(value = "SELECT DATE_FORMAT(created_time, '%d-%m-%Y') as timePeriod, sum(amount) as expense FROM transaction " +
            "WHERE user_id = :userId AND type='EXPENSE' AND created_time>date_sub(now(), interval :X DAY) AND visible=true"+
            "group by DATE_FORMAT(created_time, '%d-%m-%Y') "+
            "order by timePeriod desc "
            , nativeQuery = true)
    List<Object[]> findExpenseByUserLastXDays(Long userId, int X);

}
