package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Report;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.response.SummaryResponse;
import com.example.kits.groupa.budgetmaster.repositories.ReportRepository;
import com.example.kits.groupa.budgetmaster.repositories.TransactionProjection;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinancialSummaryService {
    private final TransactionService transactionService;
    private final ReportRepository reportRepository;

    private final UserRepository userRepository;


    @Autowired
    public FinancialSummaryService(TransactionService transactionService, ReportRepository reportRepository, UserRepository userRepository) {
        this.transactionService = transactionService;
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    public SummaryResponse getFinancialSummary(Long userId) {
        // Get the current year and month
        LocalDate currentDate = LocalDate.now();
        int year = currentDate.getYear();
        int month = currentDate.getMonthValue();

        List<TransactionProjection> monthlyTransactions = transactionService.getMonthlyTransactions(userId, year, month);

        // Calculate financial summary: totalIncome, totalExpense, totalSavings
        double totalIncome = 0;
        double totalExpense = 0;
        double totalSavings = 0;

        for (TransactionProjection transaction : monthlyTransactions) {
            if (transaction.getType().equals(Type.INCOME)) {
                totalIncome += transaction.getAmount();
            } else {
                totalExpense += transaction.getAmount();
            }
        }

        totalSavings = totalIncome - totalExpense;

        // Create a report
        LocalDate startDate = currentDate.withDayOfMonth(1); // First day of the month
        LocalDate endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        Report report = new Report(LocalDateTime.now(), startDate, endDate, userRepository.findById(userId).get());
        reportRepository.save(report);

        return new SummaryResponse(month, year, totalIncome, totalExpense, totalSavings, monthlyTransactions);
    }
}
