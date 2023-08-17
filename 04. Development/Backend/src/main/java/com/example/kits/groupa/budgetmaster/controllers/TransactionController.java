package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<List<Transaction>> getTransactionByUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Transaction> transaction = transactionService.getTransactionsByUser(userId);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Transaction>> getTransactionByType(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Type type) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Transaction> transaction = transactionService.getTransactionsByType(type, userId);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestHeader("Authorization") String authorizationHeader, @RequestBody TransactionRequest transactionRequest, @RequestPart(name="receipt", required = false) MultipartFile receiptFile) throws IOException {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Transaction transaction = transactionService.createTransaction(userId, transactionRequest, receiptFile);
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
