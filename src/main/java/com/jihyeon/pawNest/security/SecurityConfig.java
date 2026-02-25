package com.jihyeon.pawNest.security;

import com.jihyeon.pawNest.handler.OAuth2SuccessHandler;
import com.jihyeon.pawNest.user.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final JwtTokenProvider tokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // 아래 경로들은 로그인이 안 되어 있어도 무조건 접근 가능
                        .requestMatchers(
                                "/",
                                "/login/**",
                                "/oauth2/**",
                                "/error",
                                "/favicon.ico",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo ->
                                userInfo.userService(customOAuth2UserService))
                        .successHandler(oAuth2SuccessHandler) // 핸들러 등록
                        //실패했을 때 무한루프를 방지하기 위해 명시적으로 설정
                        .failureUrl("/login?error")
                )
                // JWT 필터를 UsernamePasswordAuthenticationFilter보다 먼저 실행하도록 설정!
                .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                .logoutUrl("/logout") // 1. 프론트에서 이 URL로 요청을 보냄
                .logoutSuccessHandler((request, response, authentication) -> {
                    // 2. 우리 서버 로그아웃 처리가 성공하면 실행될 로직

                    String clientId = "ab28d0e606000f45ecb7687cb0738822"; // 카카오 REST API 키
                    String logoutRedirectUri = "http://localhost:8080/oauth2/authorization/kakao"; // 다시 돌아올 우리 주소

                    // 3. 카카오 로그아웃 URL 생성
                    String kakaoLogoutUrl = "https://kauth.kakao.com/oauth/logout?client_id="
                            + clientId + "&logout_redirect_uri=" + logoutRedirectUri;

                    // 4. 카카오로 리다이렉트
                    response.sendRedirect(kakaoLogoutUrl);
                })
                .invalidateHttpSession(true) // 세션 무효화
                .deleteCookies("JSESSIONID") // 쿠키 삭제
        );
        return http.build();
    }
}