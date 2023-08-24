package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionUpdateRequest;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionResponse;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("api/user/transaction")
public class TransactionController {
    private final JwtUtils jwtUtils;
    private final TransactionService transactionService;


    @Autowired
    public TransactionController(JwtUtils jwtUtils, TransactionService transactionService){
        this.jwtUtils = jwtUtils;
        this.transactionService = transactionService;
    }

    @GetMapping("/all")
    public ResponseEntity<TransactionResponse> getTransactionByUser(@RequestHeader("Authorization") String authorizationHeader, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        TransactionResponse transaction = transactionService.getTransactionsByUser(userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/type")
    public ResponseEntity<TransactionResponse> getTransactionByType(@RequestHeader("Authorization") String authorizationHeader, @RequestParam Type type, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        TransactionResponse transaction = transactionService.getTransactionsByType(type, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category")
    public ResponseEntity<TransactionResponse> getTransactionByCategoryName(@RequestHeader("Authorization") String authorizationHeader, @RequestParam String category, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        TransactionResponse transaction = transactionService.getTransactionsByCategoryName(category, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<TransactionResponse> getTransactionByCategory(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int categoryId, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        TransactionResponse transaction = transactionService.getTransactionsByCategory(categoryId, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<TransactionInfo> createTransaction(@RequestHeader("Authorization") String authorizationHeader, @RequestBody TransactionRequest transactionRequest, @RequestParam(name="receipt", required = false) MultipartFile receiptFile) throws IOException {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        TransactionInfo transaction = transactionService.createTransaction(userId, transactionRequest, receiptFile);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<TransactionInfo> updateTransaction(@RequestHeader("Authorization") String authorizationHeader,
            @PathVariable int transactionId,
            @RequestBody TransactionUpdateRequest request) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        TransactionInfo updatedTransaction = transactionService.updateTransaction(userId, transactionId, request);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/dates")
    public ResponseEntity<TransactionResponse> getTransactionBetweenDates(@RequestHeader("Authorization") String authorizationHeader, @RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate, Pageable pageable){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
           TransactionResponse transaction = transactionService.getTransactionsBetweenDates(startDate, endDate, userId, pageable);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping ("/{transactionId}")
    public ResponseEntity<String> deleteTransaction(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int transactionId) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        transactionService.deleteTransaction(userId, transactionId);
        return new ResponseEntity<>("Transaction deleted successfully", HttpStatus.OK);
    }
}
