package com.jihyeon.pawNest.domain.user;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, unique = true)
    private String userId; // 이메일에서 파싱한 아이디가 저장될 곳

    @Builder
    public User(String nickname, String email, String userId, Role role) {
        this.nickname = nickname;
        this.email = email;
        this.userId = userId;
        this.role = role;
    }

    // 이름이 바뀌었을 때를 대비한 업데이트 로직
    public User update(String nickname,String userId) {
        this.nickname = nickname;
        this.userId = userId;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}