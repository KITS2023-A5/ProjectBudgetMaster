package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import com.example.kits.groupa.budgetmaster.repositories.CategoryRepository;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.Deflater;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public List<Transaction> getTransactionsByUser(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    public Transaction createTransaction(Long userId, TransactionRequest transactionRequest, MultipartFile receiptFile) throws IOException {
        Transaction transaction = new Transaction();
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setType(transactionRequest.getType());
        transaction.setCreatedTime(LocalDateTime.now());

        Category category = categoryRepository.findById(transactionRequest.getCategoryId()).orElse(null);
        transaction.setCategory(category);
        User user = userRepository.findById(userId).orElse(null);
        transaction.setUser(user);

//        try {
//            if (receiptFile != null && !receiptFile.isEmpty()) {
//                byte[] receiptBytes = receiptFile.getBytes();
//                transaction.setReceipt(receiptBytes);
//            }
//        } catch (IOException e) {
//
//        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByType(Type type, Long userId) {
        return transactionRepository.findAllByType(type, userId);
    }

    public void deleteTransaction(Long userId, int transactionId) {
        Transaction existingTransaction = transactionRepository.findByTransactionIdAndUserId(transactionId, userId);
        if (existingTransaction != null) {
            transactionRepository.delete(existingTransaction);
        }
    }
}