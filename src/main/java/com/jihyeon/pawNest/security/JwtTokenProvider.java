package com.jihyeon.pawNest.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private SecretKey key;//변환된 key 객체를 담는 곳(보안을 위해 secretKey 문자열말고 객체로 전달받음)

    private final long validityInMilliseconds = 3600000; //1시간

    // 객체 생성 후 별도로 실행되는 초기화 메서드
    @PostConstruct
    protected void init() {
        // 불러온 문자열을 SecretKey 객체로 변환합니다.
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // 3. 토큰 생성 메서드
    public String createToken(String userId, String nickname) {
        // 내용(Payload) 설정
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("nickname", nickname);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        // 토큰 조립
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(this.key, SignatureAlgorithm.HS256)// 암호화 알고리즘(토큰 만들때 사용)
                .compact();
    }

    // 4. 토큰에서 유저 ID(parsedId) 추출 (나중에 필터에서 사용)
    public String getUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 5. 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}