package com.example.ProductsJava.repo;

import com.example.ProductsJava.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {
}
