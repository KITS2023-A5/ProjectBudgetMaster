package com.example.kits.groupa.budgetmaster.services;

import com.example.kits.groupa.budgetmaster.entities.Category;
import com.example.kits.groupa.budgetmaster.entities.User;
import com.example.kits.groupa.budgetmaster.entities.enumeration.Type;
import com.example.kits.groupa.budgetmaster.payload.request.UpdateCategoryRequest;
import com.example.kits.groupa.budgetmaster.repositories.CategoryRepository;
import com.example.kits.groupa.budgetmaster.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository){
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public List<Category> getAllCategories(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return categoryRepository.findAll();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public Category getById(Long userId, int categoryId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
        }
        else {
            throw new RuntimeException("User not found");
        }
    }

    public List<Category> getByType(Long userId, Type type){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return categoryRepository.findByType(type);
        }
        else {
            throw new RuntimeException("User not found");
        }
    }
}
