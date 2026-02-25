package com.jihyeon.pawNest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing // 이게 있어야 entity 날짜가 자동으로 생성됨
@SpringBootApplication
public class PawNestApplication {

	public static void main(String[] args) {
		SpringApplication.run(PawNestApplication.class, args);
	}

}