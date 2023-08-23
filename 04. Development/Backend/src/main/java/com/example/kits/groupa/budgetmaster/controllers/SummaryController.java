package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.payload.response.SummaryResponse;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.FinancialSummaryService;
import com.example.kits.groupa.budgetmaster.services.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/summary")
public class SummaryController {
    private final JwtUtils jwtUtils;

    private final FinancialSummaryService financialSummaryService;

    public SummaryController(JwtUtils jwtUtils, FinancialSummaryService financialSummaryService) {
        this.jwtUtils = jwtUtils;
        this.financialSummaryService = financialSummaryService;
    }

    @GetMapping("/saving-predictions")
    public ResponseEntity<List<Double>> getSavingPredictions(@RequestHeader("Authorization") String authorizationHeader, @RequestParam Integer period){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Double> predictions = financialSummaryService.getSavingsPrediction(userId, period);
        return new ResponseEntity<>(predictions, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SummaryResponse> getFinancialSummary(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        // Get the current year and month
        SummaryResponse summaryResponse = financialSummaryService.getFinancialSummary(userId);
        return new ResponseEntity<>(summaryResponse, HttpStatus.OK);
    }
}
