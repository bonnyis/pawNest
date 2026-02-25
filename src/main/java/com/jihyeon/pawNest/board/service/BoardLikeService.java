package com.jihyeon.pawNest.board.service;

import com.jihyeon.pawNest.board.repository.BoardLikeRepository;
import com.jihyeon.pawNest.board.repository.BoardRepository;
import com.jihyeon.pawNest.domain.board.Board;
import com.jihyeon.pawNest.domain.board.BoardLike;
import com.jihyeon.pawNest.dto.response.board.BoardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardLikeService {

    private final BoardLikeRepository boardLikeRepository;
    private final BoardRepository boardRepository;

    // 관심글 목록 조회
    @Transactional(readOnly = true)
    public Page<BoardResponse> getMyLikeBoards(String userId, Pageable pageable) {
        // 1. 내 writerId로 BoardLike 데이터들(중간 다리)을 가져옵니다.
        Page<BoardLike> likes = boardLikeRepository.findAllByWriterIdOrderByCreatedAtDesc(userId, pageable);

        // 2. 변환(map): BoardLike 객체 안에 들어있는 Board를 꺼내서 DTO로 바꿉니다.
        return likes.map(like -> new BoardResponse(like.getBoard()));
    }

    // 관심글 등록 및 해제
    @Transactional
    public String toggleLike(String userId, Long boardId) {
        Board board = boardRepository.findByBoardIdAndDeletedAtIsNull(boardId)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. boardId=" + boardId));

        // 이미 등록했는지 확인
        Optional<BoardLike> like = boardLikeRepository.findAllByWriterIdAndBoard(userId,board);

        if (like.isPresent()) {
            boardLikeRepository.delete(like.get());
            return "관심글 해제 완료";
        } else {
            boardLikeRepository.save(new BoardLike(userId, board));
            return "관심글 등록 완료";
        }
    }
}