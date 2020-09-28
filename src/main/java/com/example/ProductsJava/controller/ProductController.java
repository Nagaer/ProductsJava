package com.example.ProductsJava.controller;

import com.example.ProductsJava.domain.Product;
import com.example.ProductsJava.repo.ProductRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {
    private final ProductRepo productRepo;

    @Autowired
    public ProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @GetMapping
    public List<Product> list() {
        return productRepo.findAll();
    }

    @GetMapping("{id}")
    public Product getOne(@PathVariable("id") Product product) {
        return product;
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return productRepo.save(product);
    }

    @PutMapping("{id}")
    public Product update(
            @PathVariable("id") Product productFromDb,
            @RequestBody Product product) {
        BeanUtils.copyProperties(product, productFromDb, "id");

        return productRepo.save(productFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Product product) {
        productRepo.delete(product);
    }
}
