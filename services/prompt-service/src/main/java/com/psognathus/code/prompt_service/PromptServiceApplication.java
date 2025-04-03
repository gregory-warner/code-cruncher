package com.psognathus.code.prompt_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@SpringBootApplication
public class PromptServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(PromptServiceApplication.class, args);
	}
}