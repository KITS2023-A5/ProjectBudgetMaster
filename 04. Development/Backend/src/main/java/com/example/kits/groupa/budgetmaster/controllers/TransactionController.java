package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/transaction")
public class TransactionController {
    private final JwtUtils jwtUtils;
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(JwtUtils jwtUtils, TransactionService transactionService) {
        this.jwtUtils = jwtUtils;
        this.transactionService = transactionService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getTransactionById(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Transaction> transaction = transactionService.getTransactionsByUser(userId);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestHeader("Authorization") String authorizationHeader, @RequestBody TransactionRequest transactionRequest) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Transaction transaction = transactionService.createTransaction(userId, transactionRequest);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int transactionId) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        transactionService.deleteTransaction(userId, transactionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
