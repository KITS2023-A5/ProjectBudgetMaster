package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.Role;
import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.ERole;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionUpdateRequest;
import com.example.kits.groupa.budgetmaster.payload.response.ExpenseStatistics;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionResponse;
import com.example.kits.groupa.budgetmaster.payload.response.UserIncomeResponse;
import com.example.kits.groupa.budgetmaster.repositories.*;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
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

    public TransactionResponse getTransactionsByUser(Long userId, Pageable pageable) {
        Page<TransactionProjection> transactionsPage = transactionRepository.findByUserId(userId, pageable);
        List<TransactionProjection> transactions = transactionsPage.getContent();
        long totalCount = transactionsPage.getTotalElements();

        return new TransactionResponse(totalCount, transactions);
    }

    public TransactionResponse getTransactionsByType(Type type, Long userId, Pageable pageable) {
        Page<TransactionProjection> transactionsPage = transactionRepository.findTransactionByType(type, userId, pageable);
        List<TransactionProjection> transactions = transactionsPage.getContent();
        long totalCount = transactionsPage.getTotalElements();

        return new TransactionResponse(totalCount, transactions);
    }

    public TransactionInfo createTransaction(Long userId, TransactionRequest transactionRequest, MultipartFile receiptFile) throws IOException {
        Transaction transaction = new Transaction();
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setCreatedTime(LocalDateTime.now());

        Category category = categoryRepository.findById(transactionRequest.getCategoryId()).orElse(null);
        transaction.setCategory(category);
        User user = userRepository.findById(userId).orElse(null);
        transaction.setUser(user);
        transaction.setVisible(true);
        if (receiptFile != null && !receiptFile.isEmpty()) {
            // Save the receipt file to a location or process it as needed
            String extension = FilenameUtils.getExtension(receiptFile.getOriginalFilename());
            String fileName = UUID.randomUUID().toString() + "." + extension;
            String filePath = "/receipts" + fileName; // Replace with the desired file path
            receiptFile.transferTo(new File(filePath));
            transaction.setReceipt(filePath);
        }
        transactionRepository.save(transaction);
        return new TransactionInfo(transactionRequest.getAmount(), transactionRequest.getDescription(), LocalDateTime.now(), transactionRequest.getCategoryId(), userId);
    }


    public TransactionResponse getTransactionsByCategoryName(String category, Long userId, Pageable pageable) {
        Page<TransactionProjection> transactionsPage = transactionRepository.findAllByCategoryName(category, userId, pageable);
        List<TransactionProjection> transactions = transactionsPage.getContent();
        long totalCount = transactionsPage.getTotalElements();

        return new TransactionResponse(totalCount, transactions);
    }

    public TransactionResponse getTransactionsByCategory(int categoryId, Long userId, Pageable pageable) {
        Page<TransactionProjection> transactionsPage = transactionRepository.findAllByCategory(categoryId, userId, pageable);
        List<TransactionProjection> transactions = transactionsPage.getContent();
        long totalCount = transactionsPage.getTotalElements();

        return new TransactionResponse(totalCount, transactions);
    }

    public TransactionInfo updateTransaction(Long userId, int transactionId, TransactionUpdateRequest request) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionId);
        User user = userRepository.findById(userId).orElse(null);
        if (optionalTransaction.isPresent() && optionalTransaction.get().getUser().equals(user)) {
            Transaction transaction = optionalTransaction.get();
            if (request.getAmount()!=null){
                transaction.setAmount(request.getAmount());
            }
            if (request.getDescription()!=null){
                transaction.setDescription(request.getDescription());
            }
            transaction.setReceipt(request.getReceipt());
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            if(category!=null){
                transaction.setCategory(category);
            }
            transaction.setUpdatedTime(LocalDateTime.now());
            transactionRepository.save(transaction);
            return new TransactionInfo(transaction.getAmount(), transaction.getDescription(), transaction.getCreatedTime(), transaction.getUpdatedTime(), transaction.getReceipt(), transaction.getCategory().getCategoryId(), userId);
        } else {
            return null;
        }
    }

    public TransactionResponse getTransactionsBetweenDates(LocalDateTime startDate, LocalDateTime endDate, Long userId, Pageable pageable) {
        Page<TransactionProjection> transactionsPage = transactionRepository.findAllBetweenDates(startDate, endDate, userId, pageable);
        List<TransactionProjection> transactions = transactionsPage.getContent();
        long totalCount = transactionsPage.getTotalElements();

        return new TransactionResponse(totalCount, transactions);
    }

    public TransactionResponse getAllExpenseByUser(Long userId, Pageable pageable) {
        Page<TransactionProjection> transactionsPage = transactionRepository.findAllExpenseByUserId(userId, pageable);
        List<TransactionProjection> transactions = transactionsPage.getContent();
        long totalCount = transactionsPage.getTotalElements();

        return new TransactionResponse(totalCount, transactions);
    }

    public void deleteTransaction(Long userId, int transactionId) {
        Transaction existingTransaction = transactionRepository.findByTransactionIdAndUserId(transactionId, userId);
        if (existingTransaction != null) {
            existingTransaction.setVisible(false);
            transactionRepository.save(existingTransaction);
        }
    }
}
