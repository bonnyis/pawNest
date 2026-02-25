package com.jihyeon.pawNest.board.repository;

import com.jihyeon.pawNest.domain.board.Board;
import com.jihyeon.pawNest.domain.board.BoardLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike,Long> {

    // 1. 관심글 목록 조회
    // 특정 작성자가 누른 관심글 목록을 최신순으로 페이징 조회
    Page<BoardLike> findAllByWriterIdOrderByCreatedAtDesc(String writerId, Pageable pageable);

    // 2. 관심글 유무 조회
    // Optional을 사용하여 결과가 없을 경우 안전하게 처리합니다.
    Optional<BoardLike> findAllByWriterIdAndBoard(String userId, Board board);

    // 3. 해당 게시글의 전체 좋아요 개수
    long countByBoard_BoardId(Long boardId);

}