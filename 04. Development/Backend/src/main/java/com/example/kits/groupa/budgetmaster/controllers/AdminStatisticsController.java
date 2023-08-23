package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.AdminStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/statistics")
public class AdminStatisticsController {
    private final JwtUtils jwtUtils;
    private final AdminStatisticsService adminStatisticsService;


    @Autowired
    public AdminStatisticsController(JwtUtils jwtUtils, AdminStatisticsService adminStatisticsService){
        this.jwtUtils = jwtUtils;
        this.adminStatisticsService = adminStatisticsService;
    }

    @GetMapping("/total")
    public ResponseEntity<?> getIncomeAndExpenseByUser(@RequestHeader ("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        return ResponseEntity.ok(adminStatisticsService.calculateIncomeAndExpenseByUser(userId));
    }
}
