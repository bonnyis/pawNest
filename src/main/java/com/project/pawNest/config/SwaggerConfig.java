package com.project.pawNest.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//http://localhost:8886/swagger-ui/index.html
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());}
    private Info apiInfo() {
        return new Info()
                .title("pawNest 서비스 명세")
                .description("")
                .version("1.0.0");}
}
