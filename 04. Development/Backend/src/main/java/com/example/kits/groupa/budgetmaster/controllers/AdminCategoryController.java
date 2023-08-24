package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateCategoryRequest;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.AdminCategoryService;
import com.example.kits.groupa.budgetmaster.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin/category")
public class AdminCategoryController {
    private final AdminCategoryService adminCategoryService;

    private final JwtUtils jwtUtils;

    public AdminCategoryController(AdminCategoryService adminCategoryService, JwtUtils jwtUtils) {
        this.adminCategoryService = adminCategoryService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("")
    public ResponseEntity<Category> createCategory(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Category newCategory) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Category category = adminCategoryService.createCategory(userId, newCategory);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int categoryId, @RequestBody UpdateCategoryRequest updateCategoryRequest){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Category category = adminCategoryService.updateCategory(userId, categoryId, updateCategoryRequest);
        return ResponseEntity.ok(category);
    }
}
