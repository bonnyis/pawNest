package com.jihyeon.pawNest.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("pawNest API 명세서")
                        .description("실종동물 찾기 및 유기동물 보호소 확인 가능한 사이트.")
                        .version("1.0.0"));
    }
}