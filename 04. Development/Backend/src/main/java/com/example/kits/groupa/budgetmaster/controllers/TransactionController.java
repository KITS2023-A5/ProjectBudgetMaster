package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionUpdateRequest;
import com.example.kits.groupa.budgetmaster.payload.response.ExpenseStatistics;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import com.example.kits.groupa.budgetmaster.repositories.TransactionProjection;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/user/transaction")
public class TransactionController {
    private final JwtUtils jwtUtils;
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(JwtUtils jwtUtils, TransactionService transactionService) {
        this.jwtUtils = jwtUtils;
        this.transactionService = transactionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TransactionProjection>> getTransactionByUser(@RequestHeader("Authorization") String authorizationHeader, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<TransactionProjection> transaction = transactionService.getTransactionsByUser(userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/type/{type}")
//    public ResponseEntity<List<TransactionProjection>> getTransactionByType(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Type type, Pageable pageable) {
//        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
//        Long userId = jwtUtils.getUserIdFromJwtToken(token);
//        List<TransactionProjection> transaction = transactionService.getTransactionsByType(type, userId, pageable);
//        if (transaction != null) {
//            return new ResponseEntity<>(transaction, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @GetMapping("/category")
    public ResponseEntity<List<TransactionProjection>> getTransactionByCategoryName(@RequestHeader("Authorization") String authorizationHeader, @RequestParam String category, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<TransactionProjection> transaction = transactionService.getTransactionsByCategoryName(category, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<TransactionProjection>> getTransactionByCategory(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int categoryId, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<TransactionProjection> transaction = transactionService.getTransactionsByCategory(categoryId, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Transaction> createTransaction(@RequestHeader("Authorization") String authorizationHeader, @RequestBody TransactionRequest transactionRequest, @RequestPart(name="receipt", required = false) MultipartFile receiptFile) throws IOException {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Transaction transaction = transactionService.createTransaction(userId, transactionRequest, receiptFile);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<Transaction> updateTransaction(@RequestHeader("Authorization") String authorizationHeader,
            @PathVariable int transactionId,
            @RequestBody TransactionUpdateRequest request) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Transaction updatedTransaction = transactionService.updateTransaction(userId, transactionId, request);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/dates")
    public ResponseEntity<List<TransactionProjection>> getTransactionByDate(@RequestHeader("Authorization") String authorizationHeader, @RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<TransactionProjection> transaction = transactionService.getTransactionsBetweenDates(startDate, endDate, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/statistics/daily")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseDailyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = transactionService.getExpenseDaily(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/statistics/weekly")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseWeeklyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = transactionService.getExpenseWeekly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/statistics/monthly")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseMonthlyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = transactionService.getExpenseMonthly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/statistics/yearly")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseYearlyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = transactionService.getExpenseYearly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/statistics/last-x-days/{X}")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseLastXDaysStatistics(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int X){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = transactionService.getExpenseLastXDays(userId, X);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/saving-predictions")
    public ResponseEntity<List<Double>> getSavingPredictions(@RequestHeader("Authorization") String authorizationHeader, @RequestParam Integer period){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Double> predictions = transactionService.getSavingsPrediction(userId, period);
        return new ResponseEntity<>(predictions, HttpStatus.OK);
    }
//    @DeleteMapping("/{transactionId}")
//    public ResponseEntity<Void> deleteTransaction(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int transactionId) {
//        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
//        Long userId = jwtUtils.getUserIdFromJwtToken(token);
//        transactionService.deleteTransaction(userId, transactionId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
