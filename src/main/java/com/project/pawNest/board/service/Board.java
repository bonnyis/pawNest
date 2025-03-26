package com.project.pawNest.board.service;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.File;

@Getter @Setter
@Entity //db 테이블과 매핑될 엔티티 클래스 정의
@Table(name = "board_tbl")//해당 엔티티 클래스와 매핑 될 db 테이블 명
public class Board {

    @Id //pk명시
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto_increment와 같은 역할
    private int recKey;

    @Column(nullable = false) //해당 컬럼의 제약 조건 명시 (not null 등..)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int viewCnt;

    @Column(nullable = false)
    private String mainFlag;

    @Column(nullable =  true)
    private File file;

    @Column(nullable = false)
    private String inputWorker;

    @Column(nullable = false)
    private String inputDate;



}
