package com.jihyeon.pawNest.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. 헤더에서 토큰을 꺼내옵니다.
        String token = resolveToken(request);

        // 2. 토큰이 유효한지 검사합니다.
        if (token != null && tokenProvider.validateToken(token)) {
            // 토큰에서 유저 아이디를 꺼냅니다.
            String userId = tokenProvider.getUserId(token);

            // 시큐리티 전용 인증 객체를 만들어 컨텍스트에 담습니다.
            // 이렇게 담아두면 컨트롤러에서 @AuthenticationPrincipal 등으로 유저 정보를 꺼낼 수 있습니다.
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList()); // 권한은 일단 null

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 3. 다음 필터로 넘깁니다.
        filterChain.doFilter(request, response);
    }

    // 헤더에서 "Authorization: Bearer [토큰]" 형식을 찾아 토큰만 쏙 빼내는 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}