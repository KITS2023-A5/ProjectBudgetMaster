package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.payload.response.ExpenseStatistics;
import com.example.kits.groupa.budgetmaster.payload.response.IncomeStatistics;
import com.example.kits.groupa.budgetmaster.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService {
    private final TransactionRepository transactionRepository;

    public StatisticsService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<ExpenseStatistics> getExpenseDaily(Long userId){
        List<Object[]> results = transactionRepository.findExpenseByUserDaily(userId);
        return getExpenseStatistics(results);
    }

    public List<ExpenseStatistics> getExpenseWeekly(Long userId){
        List<Object[]> results = transactionRepository.findExpenseByUserWeekly(userId);
        return getExpenseStatistics(results);
    }

    public List<ExpenseStatistics> getExpenseMonthly(Long userId){
        List<Object[]> results = transactionRepository.findExpenseByUserMonthly(userId);
        return getExpenseStatistics(results);
    }

    public List<ExpenseStatistics> getExpenseYearly(Long userId){
        List<Object[]> results = transactionRepository.findExpenseByUserYearly(userId);
        return getExpenseStatistics(results);
    }

    public List<ExpenseStatistics> getExpenseLastXDays(Long userId, int X){
        List<Object[]> results = transactionRepository.findExpenseByUserLastXDays(userId, X);
        return getExpenseStatistics(results);
    }

    public List<IncomeStatistics> getIncomeDaily(Long userId){
        List<Object[]> results = transactionRepository.findIncomeByUserDaily(userId);
        return getIncomeStatistics(results);
    }

    public List<IncomeStatistics> getIncomeWeekly(Long userId){
        List<Object[]> results = transactionRepository.findIncomeByUserWeekly(userId);
        return getIncomeStatistics(results);
    }

    public List<IncomeStatistics> getIncomeMonthly(Long userId){
        List<Object[]> results = transactionRepository.findIncomeByUserMonthly(userId);
        return getIncomeStatistics(results);
    }

    public List<IncomeStatistics> getIncomeYearly(Long userId){
        List<Object[]> results = transactionRepository.findIncomeByUserYearly(userId);
        return getIncomeStatistics(results);
    }

    public List<IncomeStatistics> getIncomeLastXDays(Long userId, int X){
        List<Object[]> results = transactionRepository.findIncomeByUserLastXDays(userId, X);
        return getIncomeStatistics(results);
    }

    private List<ExpenseStatistics> getExpenseStatistics(List<Object[]> results) {
        List<ExpenseStatistics> expenseStatisticsList = new ArrayList<>();

        for (Object[] result : results) {
            String timePeriod = (String) result[0];
            Double expense = (Double) result[1];

            ExpenseStatistics expenseStatistics = new ExpenseStatistics();
            expenseStatistics.setTimePeriod(timePeriod);
            expenseStatistics.setExpense(expense);

            expenseStatisticsList.add(expenseStatistics);
        }

        return expenseStatisticsList;
    }

    private List<IncomeStatistics> getIncomeStatistics(List<Object[]> results) {
        List<IncomeStatistics> incomeStatisticsList = new ArrayList<>();

        for (Object[] result : results) {
            String timePeriod = (String) result[0];
            Double income = (Double) result[1];

            IncomeStatistics incomeStatistics = new IncomeStatistics();
            incomeStatistics.setTimePeriod(timePeriod);
            incomeStatistics.setIncome(income);

            incomeStatisticsList.add(incomeStatistics);
        }

        return incomeStatisticsList;
    }
}
