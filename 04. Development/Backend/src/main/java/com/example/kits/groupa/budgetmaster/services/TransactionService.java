package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.Transaction;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionRequest;
import com.example.kits.groupa.budgetmaster.payload.request.TransactionUpdateRequest;
import com.example.kits.groupa.budgetmaster.payload.response.TransactionInfo;
import com.example.kits.groupa.budgetmaster.repositories.CategoryRepository;
import com.example.kits.groupa.budgetmaster.repositories.TransactionProjection;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    public List<TransactionProjection> getTransactionsByUser(Long userId, Pageable pageable) {
        return transactionRepository.findByUserId(userId, pageable);
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

        try {
            if (receiptFile != null && !receiptFile.isEmpty()) {
                byte[] receiptBytes = receiptFile.getBytes();
                transaction.setReceipt(receiptBytes);
            }
        } catch (IOException e) {

        }
        String fileName = receiptFile.getOriginalFilename();
        String uploadDir = "/file/upload"; // Specify the directory where you want to save the files
        String filePath = uploadDir + "/" + fileName;
        File file = new File(filePath);
        receiptFile.transferTo(file);
        return transactionRepository.save(transaction);
    }

    public List<TransactionProjection> getTransactionsByType(Type type, Long userId, Pageable pageable) {
        return transactionRepository.findAllByType(type, userId, pageable);
    }

    public List<TransactionProjection> getTransactionsByCategoryName(String category, Long userId, Pageable pageable) {
        return transactionRepository.findAllByCategoryName(category, userId, pageable);
    }

    public List<TransactionProjection> getTransactionsByCategory(int categoryId, Long userId, Pageable pageable) {
        return transactionRepository.findAllByCategory(categoryId, userId, pageable);
    }

    public Transaction updateTransaction(Long userId, int transactionId, TransactionUpdateRequest request) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionId);
        User user = userRepository.findById(userId).orElse(null);
        if (optionalTransaction.isPresent() && optionalTransaction.get().getUser().equals(user)) {
            Transaction transaction = optionalTransaction.get();
            transaction.setAmount(request.getAmount());
            transaction.setDescription(request.getDescription());
            transaction.setReceipt(request.getReceipt());
            transaction.setType(request.getType());
            transaction.setUpdatedTime(LocalDateTime.now());
            return transactionRepository.save(transaction);
        } else {
            return null;
        }
    }

    public List<TransactionProjection> getTransactionsBetweenDates(LocalDateTime startDate, LocalDateTime endDate, Long userId, Pageable pageable) {
        return transactionRepository.findAllBetweenDates(startDate, endDate, userId, pageable);
    }
//    public void deleteTransaction(Long userId, int transactionId) {
//        Transaction existingTransaction = transactionRepository.findByTransactionIdAndUserId(transactionId, userId);
//        if (existingTransaction != null) {
//            transactionRepository.delete(existingTransaction);
//        }
//    }
}
