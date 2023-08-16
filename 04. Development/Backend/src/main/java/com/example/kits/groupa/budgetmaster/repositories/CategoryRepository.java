package com.example.kits.groupa.budgetmaster.repositories;

import com.example.kits.groupa.budgetmaster.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
}
