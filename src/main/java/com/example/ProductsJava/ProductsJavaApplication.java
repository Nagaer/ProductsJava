package com.example.ProductsJava;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class ProductsJavaApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(ProductsJavaApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8081"));
		app.run(args);
	}

}
