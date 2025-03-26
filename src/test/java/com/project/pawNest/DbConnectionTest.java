package com.project.pawNest;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest(classes = PawNestApplication.class)
public class DbConnectionTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    //데이터베이스 연결 확인하는 테스트 코드
    void testDataBaseConnection(){
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        Assertions.assertThat(result).isEqualTo(1);
    }
}
