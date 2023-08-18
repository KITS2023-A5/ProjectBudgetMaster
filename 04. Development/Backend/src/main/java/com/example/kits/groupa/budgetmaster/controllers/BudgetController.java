package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Budget;
import com.example.kits.groupa.budgetmaster.payload.request.BudgetRequest;
import com.example.kits.groupa.budgetmaster.payload.response.BudgetResponse;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/budget")
public class BudgetController {
    private final BudgetService budgetService;
    private final JwtUtils jwtUtils;

    public BudgetController(BudgetService budgetService, JwtUtils jwtUtils) {
        this.budgetService = budgetService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("")
    public ResponseEntity<BudgetResponse> createBudget(@RequestHeader("Authorization") String authorizationHeader,
                                                       @RequestBody BudgetRequest budgetRequest) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        BudgetResponse budget = budgetService.createBudget(userId, budgetRequest);
        return ResponseEntity.ok(budget);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getBudgetsByUserId(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        return ResponseEntity.ok(budgetService.getBudgetsByUserId(userId));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getBudgetsByCategory(@RequestHeader("Authorization") String authorizationHeader,
                                                  @PathVariable Integer categoryId) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        return ResponseEntity.ok(budgetService.getBudgetsByCategory(userId, categoryId));
    }

    @GetMapping("/category/name/{categoryName}")
    public ResponseEntity<?> getBudgetsByCategoryName(@RequestHeader("Authorization") String authorizationHeader,
                                                      @PathVariable String categoryName) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        return ResponseEntity.ok(budgetService.getBudgetsByCategoryName(userId, categoryName));
    }

    @GetMapping("/date")
    public ResponseEntity<?> getBudgetsBetweenDates(@RequestHeader("Authorization") String authorizationHeader,
                                                    @RequestParam String startDate,
                                                    @RequestParam String endDate) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);

        return ResponseEntity.ok(budgetService.getBudgetsBetweenDates(userId, startDate, endDate));
    }
}
