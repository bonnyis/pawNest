package com.project.pawNest.board.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //entity에 정의된 db에 접근하기 위한 repository 정의
//JpaRepository<Board, Integer> 인터페이스 :
public interface BoardRepository  extends JpaRepository<Board, Integer> {
}
