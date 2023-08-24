package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.Role;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.ERole;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateCategoryRequest;
import com.example.kits.groupa.budgetmaster.repositories.CategoryRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AdminCategoryService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public AdminCategoryService(UserRepository userRepository, CategoryRepository categoryRepository){
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Long userId, String name) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Set<Role> roles = user.getRoles();


        boolean isAdmin = roles.stream()
                .anyMatch(role -> role.getName().equals(ERole.ROLE_ADMIN));

        if (isAdmin) {
            Category category = new Category();
            if (categoryRepository.findByName(name) == null && user != null) {
                category.setName(name);
                categoryRepository.save(category);
                return category;
            } else {
                throw new RuntimeException("Category already exists");
            }
        }
        else{
            throw new AccessDeniedException("Access denied");
        }
    }

    public Category updateCategory(Long userId, int categoryId, UpdateCategoryRequest updateCategoryRequest){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Set<Role> roles = user.getRoles();


        boolean isAdmin = roles.stream()
                .anyMatch(role -> role.getName().equals(ERole.ROLE_ADMIN));

        if (isAdmin) {
            Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
            if (categoryRepository.findByName(updateCategoryRequest.getName()) == null) {
                category.setName(updateCategoryRequest.getName());
                categoryRepository.save(category);
                return category;
            } else {
                throw new RuntimeException("Category already exists");
            }
        }
        else {
            throw new AccessDeniedException("Access denied");
        }
    }
}
