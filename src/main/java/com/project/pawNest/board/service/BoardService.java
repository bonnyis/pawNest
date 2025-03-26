package com.project.pawNest.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service //entity를 사용하는 비즈니스 로직을 정의
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

}
