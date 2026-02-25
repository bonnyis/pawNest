package com.jihyeon.pawNest.domain.board;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalFileName; // 원본명
    private String savedFileName;   // 저장명

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board; // 어떤 게시글의 사진인지 연결

    // 게시글 연결 메서드
    public void setBoard(Board board) {
        this.board = board;
    }
}