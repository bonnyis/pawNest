package com.jihyeon.pawNest.domain.board;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class) // 작성/수정일 자동화를 위해 필요
public class BoardLike {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    private String writerId; // 누가

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board; // 어떤 글을 좋아하는지

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt; // 작성일

    public BoardLike(String writerId, Board board) {
        this.writerId = writerId;
        this.board = board;
    }
}