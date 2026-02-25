package com.jihyeon.pawNest.board.repository;

import com.jihyeon.pawNest.domain.board.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    // 1. 목록 조회
    @Query("SELECT b FROM Board b WHERE " +
            "(:breed1 IS NULL OR b.breed1 LIKE %:breed1%) AND " +
            "(:color IS NULL OR b.color LIKE %:color%) AND " +
            "(:searchText IS NULL OR b.features LIKE %:searchText% OR b.missingLocation LIKE %:searchText%) AND " +
            "b.deletedAt IS NULL")
    Page<Board> findBySearchConditions(
            @Param("breed1") String breed1,
            @Param("color") String color,
            @Param("searchText") String searchText,
            Pageable pageable);

    // 2. 단건 상세 조회 (삭제되지 않은 게시글만)
    // Optional을 사용하여 결과가 없을 경우 안전하게 처리합니다.
    Optional<Board> findByBoardIdAndDeletedAtIsNull(Long boardId);

    // 3. 특정 작성자(writerId)가 쓴 글 목록 조회
    // 마이페이지 본인이 쓴 글 조회용
    Page<Board> findAllByWriterIdAndDeletedAtIsNull(String writerId, Pageable pageable);

    // 4. 조회수 top 5 목록 조회
    // 조회수가 같으면 최신 순 정렬
    List<Board> findTop5ByOrderByViewCountDescCreatedAtDesc();

    // 5. 최신 글 top 5 목록 조회
    List<Board> findTop5ByOrderByCreatedAtDesc();

}