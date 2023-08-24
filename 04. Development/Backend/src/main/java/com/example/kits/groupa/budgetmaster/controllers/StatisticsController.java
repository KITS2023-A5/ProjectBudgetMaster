package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.payload.response.ExpenseStatistics;
import com.example.kits.groupa.budgetmaster.payload.response.IncomeStatistics;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.StatisticsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/user/statistics")
public class StatisticsController {
    private final JwtUtils jwtUtils;
    
    private final StatisticsService statisticsService;
    
    public StatisticsController(JwtUtils jwtUtils, StatisticsService statisticsService){
        this.jwtUtils = jwtUtils;
        this.statisticsService = statisticsService;
    }
    
    @GetMapping("/expense/daily")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseDailyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = statisticsService.getExpenseDaily(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/expense/weekly")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseWeeklyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = statisticsService.getExpenseWeekly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/expense/monthly")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseMonthlyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = statisticsService.getExpenseMonthly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/expense/yearly")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseYearlyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = statisticsService.getExpenseYearly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/expense/last-x-days/{X}")
    public ResponseEntity<List<ExpenseStatistics>> getExpenseLastXDaysStatistics(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int X){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<ExpenseStatistics> statistics = statisticsService.getExpenseLastXDays(userId, X);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/income/daily")
    public ResponseEntity<List<IncomeStatistics>> getIncomeDailyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<IncomeStatistics> statistics = statisticsService.getIncomeDaily(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/income/weekly")
    public ResponseEntity<List<IncomeStatistics>> getIncomeWeeklyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<IncomeStatistics> statistics = statisticsService.getIncomeWeekly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/income/monthly")
    public ResponseEntity<List<IncomeStatistics>> getIncomeMonthlyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<IncomeStatistics> statistics = statisticsService.getIncomeMonthly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/income/yearly")
    public ResponseEntity<List<IncomeStatistics>> getIncomeYearlyStatistics(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<IncomeStatistics> statistics = statisticsService.getIncomeYearly(userId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    @GetMapping("/income/last-x-days/{X}")
    public ResponseEntity<List<IncomeStatistics>> getIncomeLastXDaysStatistics(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int X){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<IncomeStatistics> statistics = statisticsService.getIncomeLastXDays(userId, X);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }
}
