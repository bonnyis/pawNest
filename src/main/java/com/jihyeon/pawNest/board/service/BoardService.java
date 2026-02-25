package com.jihyeon.pawNest.board.service;

import com.jihyeon.pawNest.board.repository.BoardLikeRepository;
import com.jihyeon.pawNest.board.repository.BoardRepository;
import com.jihyeon.pawNest.domain.board.Board;
import com.jihyeon.pawNest.domain.board.BoardImage;
import com.jihyeon.pawNest.domain.board.BoardLike;
import com.jihyeon.pawNest.dto.request.board.BoardCreateRequest;
import com.jihyeon.pawNest.dto.request.board.BoardUpdateRequest;
import com.jihyeon.pawNest.dto.response.board.BoardResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardLikeRepository boardLikeRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 게시글 등록
    @Transactional
    public Long create(BoardCreateRequest request, List<MultipartFile> files,String userId) throws IOException {
        // 1. 게시글 먼저 생성
        request.setWriterId(userId);
        Board board = request.toEntity();
        board.generateTitle();//제목 생성
        // 2. 파일들 하나씩 저장 및 엔티티 생성
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String savedName = saveFile(file); // 기존에 만든 저장 로직
                    BoardImage image = BoardImage.builder()
                            .originalFileName(file.getOriginalFilename())
                            .savedFileName(savedName)
                            .build();
                    board.addImage(image); // 게시글에 이미지 연결
                }
            }
        }

        return boardRepository.save(board).getBoardId();
    }

    public String saveFile(MultipartFile file) throws IOException {
        // 1. 저장할 폴더가 없으면 생성
        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        // 2. 현재 날짜와 시간 포맷팅 (예: 20260211_164025)
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

        // 3. 파일명 중복 방지를 위한 UUID 생성
        String originalFileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        // 최종 파일명: 20260211_164025_a1b2c3.jpg (날짜_시간_UUID일부.확장자)
        String savedFileName = timestamp + "_" + uuid.substring(0, 8) + extension;

        // 3. 실제 파일 저장
        Path path = Paths.get(uploadDir).resolve(savedFileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return savedFileName;
    }

    // 게시글 목록 조회
    @Transactional(readOnly = true)
    public Page<BoardResponse> findAll(String breed1,String color, String searchText, Pageable pageable) {
        // 빈 문자열("")이나 공백만 있는 문자열은 null로 변환하여 쿼리에서 무시되도록 처리
        String b1 = (breed1 != null && !breed1.isBlank()) ? "%" + breed1 + "%" : null;
        String col = (color != null && !color.isBlank()) ? "%" + color + "%" : null;
        String search = (searchText != null && !searchText.isBlank()) ? "%" + searchText + "%" : null;

        // 복합 검색 조건으로 조회
        Page<Board> boards = boardRepository.findBySearchConditions(b1, col, search, pageable);

        // Page<Board>를 Page<BoardResponse>로 변환
        return boards.map(BoardResponse::new);
    }

    // 상세 조회 및 조회수 증가
    @Transactional
    public BoardResponse findById(Long boardId,String userId) {
        Board board = boardRepository.findByBoardIdAndDeletedAtIsNull(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. boardId=" + boardId));

        // 2. 조회수 증가 호출
        board.incrementViewCount();

        // 3. 관심글 여부 및 개수 추가
        Optional<BoardLike> isLiked = Optional.empty();
        if(userId != null){
            isLiked = boardLikeRepository.findAllByWriterIdAndBoard(userId,board);
        }
        long likeCnt = boardLikeRepository.countByBoard_BoardId(boardId);

        // 4. 응답 DTO 반환 (이때 트랜잭션이 종료되면서 DB에 반영됨)
        return new BoardResponse(board,isLiked.isPresent(),likeCnt);
    }

    // 수정
    @Transactional
    public void update(Long boardId, BoardUpdateRequest request,
                       List<MultipartFile> newFiles) throws IOException {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. boardId=" + boardId));
        // 1. 기존 텍스트 정보 수정
        board.update(
                request.getBreed1(),
                request.getBreed2(),
                request.getGender(),
                request.getAge(),
                request.getColor(),
                request.getFeatures(),
                request.getMissingDate(),
                request.getMissingLocation()
        );
        board.generateTitle(); //제목 수정

        // 2. 새로운 파일이 들어왔다면 기존 이미지 초기화 후 재등록
        if (newFiles != null && !newFiles.isEmpty()) {
            // (1) 서버 폴더에서 기존 물리 파일 삭제
            for (BoardImage oldImage : board.getImages()) {
                deleteActualFile(oldImage.getSavedFileName());
            }

            // (2) DB 관계 끊기
            // board의 images 옵션 중 orphanRemoval=true에 의해 자식 레코드는 DELETE 예약됨
            board.getImages().clear();

            // (3) 새 파일 저장 및 리스트에 추가
            for (MultipartFile file : newFiles) {
                String savedName = saveFile(file); // 이전에 만든 날짜+UUID 저장 메서드
                BoardImage newImage = BoardImage.builder()
                        .originalFileName(file.getOriginalFilename())
                        .savedFileName(savedName)
                        .build();
                board.addImage(newImage); // 편의 메서드로 연결
            }
        }
    }

    // 삭제 (Soft Delete)
    @Transactional
    public void delete(Long boardId) {
        Board board = boardRepository.findByBoardIdAndDeletedAtIsNull(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. boardId=" + boardId));

        if (board.getImages() != null && !board.getImages().isEmpty()) {
            // 1. 서버 폴더에서 이 게시글과 관련된 모든 물리 파일 삭제
            for (BoardImage image : board.getImages()) {
                deleteActualFile(image.getSavedFileName());
            }

            // 2. 첨부파일 DB 레코드 삭제 (Hard Delete)
            // orphanRemoval = true 설정 덕분에 리스트를 비우면 DB에서 DELETE 쿼리가 나갑니다.
            board.getImages().clear();
        }
        // 3. 게시글 삭제 (Soft Deleted)
        board.delete();
    }

    // 내가 쓴 글 조회
    public Page<BoardResponse> getMyPosts(String userId, Pageable pageable) {
        return boardRepository.findAllByWriterIdAndDeletedAtIsNull(userId, pageable)
                .map(BoardResponse::new);
    }

    // 첨부파일 hard delete 로직
    private void deleteActualFile(String fileName) {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        try {
            // 파일이 존재하면 삭제
            boolean result = Files.deleteIfExists(filePath);
            if (result) {
                System.out.println("파일 삭제 성공: " + fileName);
            }
        } catch (IOException e) {
            // 삭제 실패 시 로그는 남기되, 전체 프로세스가 멈추지 않게 예외 처리만 함
            System.err.println("파일 삭제 실패 (경로 오류 등): " + fileName + ", 에러: " + e.getMessage());
        }
    }

    // 최신글,인기글 5개 조회
    public Map<String,List<BoardResponse>> mainList(){
        Map<String,List<BoardResponse>> mainBoard = new HashMap<>();

        // 최신글 5개 조회
        List<BoardResponse> recentBoardList = boardRepository.findTop5ByOrderByCreatedAtDesc()
                .stream().map(BoardResponse::new).toList();

        // 인기글 5개 조회
        List<BoardResponse> popularBoardList = boardRepository.findTop5ByOrderByViewCountDescCreatedAtDesc()
                .stream().map(BoardResponse::new).toList();

        mainBoard.put("recentBoardList",recentBoardList);
        mainBoard.put("popularBoardList",popularBoardList);

        return mainBoard;
    }
}