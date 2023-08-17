package com.example.kits.groupa.budgetmaster.controllers;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateCategoryRequest;
import com.example.kits.groupa.budgetmaster.security.jwt.JwtUtils;
import com.example.kits.groupa.budgetmaster.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category")
public class CategoryController {
    private final CategoryService categoryService;

    private final JwtUtils jwtUtils;

    public CategoryController(CategoryService categoryService, JwtUtils jwtUtils) {
        this.categoryService = categoryService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping()
    public ResponseEntity<Category> createCategory(@RequestHeader("Authorization") String authorizationHeader, @RequestParam String name) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Category category = categoryService.createCategory(userId, name);
        return ResponseEntity.ok(category);
    }

    @GetMapping()
    public ResponseEntity<?> getAllCategories(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        return ResponseEntity.ok(categoryService.getAllCategories(userId));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategoryById(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int categoryId) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        return ResponseEntity.ok(categoryService.getById(userId, categoryId));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int categoryId, @RequestBody UpdateCategoryRequest updateCategoryRequest){
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        Category category = categoryService.updateCategory(userId, categoryId, updateCategoryRequest);
        return ResponseEntity.ok(category);
    }
}
