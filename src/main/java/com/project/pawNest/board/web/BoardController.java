package com.project.pawNest.board.web;

import com.project.pawNest.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 실종,입양 동물 제보 게시판 컨트롤러
@RestController
@RequestMapping("/service/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    //메인 관리가이드 목록 조회
    //게시글 목록 조회
    //게시글 상세 조회
    //게시글 등록
    //게시글 수정
    //게시글 삭제
}
