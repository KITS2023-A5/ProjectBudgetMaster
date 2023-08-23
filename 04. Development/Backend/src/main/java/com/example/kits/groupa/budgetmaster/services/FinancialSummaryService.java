package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Report;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.response.SummaryResponse;
import com.example.kits.groupa.budgetmaster.repositories.ReportRepository;
import com.example.kits.groupa.budgetmaster.repositories.TransactionProjection;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

@Service
public class FinancialSummaryService {
    private final TransactionRepository transactionRepository;
    private final ReportRepository reportRepository;

    private final UserRepository userRepository;

    @Autowired
    public FinancialSummaryService(TransactionRepository transactionRepository, ReportRepository reportRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    public SummaryResponse getFinancialSummary(Long userId) {
        // Get the current year and month
        LocalDate currentDate = LocalDate.now();
        int year = currentDate.getYear();
        int month = currentDate.getMonthValue();

        List<TransactionProjection> monthlyTransactions = this.getMonthlyTransactions(userId, year, month);

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

    public List<Double> getSavingsPrediction(Long userId, int futurePeriods) {
        List<Double> amounts = new ArrayList<>();
        List<TransactionProjection> transactions = transactionRepository.findByUserId(userId);
        double income = 0;
        double expenses = 0;

        for (TransactionProjection transaction : transactions) {
            if (transaction.getType() == Type.EXPENSE) {
                expenses += transaction.getAmount();
            } else {
                income += transaction.getAmount();
            }
        }

        double savings = income - expenses;

        List<Double> predictedSavings = new ArrayList<>();
        int n = transactions.size();
        int windowSize = n;

        for (int i = n; i < n + futurePeriods; i++) {
            int startIndex = Math.max(0, i - windowSize);
            int endIndex = Math.min(i, n);
            List<TransactionProjection> window = transactions.subList(startIndex, endIndex);
            double windowIncome = 0;
            double windowExpenses = 0;

            for (TransactionProjection transaction : window) {
                if (transaction.getType() == Type.EXPENSE) {
                    windowExpenses += transaction.getAmount();
                } else {
                    windowIncome += transaction.getAmount();
                }
            }

            double windowSavings = windowIncome - windowExpenses;
            predictedSavings.add(windowSavings);
        }

        return predictedSavings;
    }

    public List<TransactionProjection> getMonthlyTransactions(Long userId, int year, int month) {
        LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0, 0);
        LocalDateTime endDateTime = startDateTime.with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX);

        return transactionRepository.findAllBetweenDates(startDateTime, endDateTime, userId);
    }
}
