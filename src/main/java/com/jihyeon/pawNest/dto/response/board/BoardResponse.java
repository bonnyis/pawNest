package com.jihyeon.pawNest.dto.response.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jihyeon.pawNest.domain.board.Board;
import com.jihyeon.pawNest.domain.board.BoardImage;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class BoardResponse {
    private Long boardId;
    private String writerId;
    private String breed1;
    private String breed2;
    private String gender;
    private String age;
    private String color;
    private String title;
    private String features;
    private LocalDate missingDate;
    private String missingLocation;
    private int viewCount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    //이미지 정보를 담을 리스트
    private List<ImageResponse> images;

    private boolean isLiked;
    private long likeCnt;

    public BoardResponse(Board board) {
        this.boardId = board.getBoardId();
        this.writerId = board.getWriterId();
        this.breed1 = board.getBreed1();
        this.breed2 = board.getBreed2();
        this.gender = board.getGender();
        this.age = board.getAge();
        this.features = board.getFeatures();
        this.missingDate = board.getMissingDate();
        this.missingLocation = board.getMissingLocation();
        this.viewCount = board.getViewCount();
        this.createdAt = board.getCreatedAt();
        this.color = board.getColor();
        this.title = board.getTitle();
        this.likeCnt = 0;
        this.isLiked = false;

        //BoardImage 엔티티 리스트를 ImageResponse DTO 리스트로 변환
        if (board.getImages() != null) {
            this.images = board.getImages().stream()
                    .map(ImageResponse::new)
                    .collect(Collectors.toList());
        }
    }

    public BoardResponse(Board board, boolean isLiked, long likeCnt) {
        this.boardId = board.getBoardId();
        this.writerId = board.getWriterId();
        this.breed1 = board.getBreed1();
        this.breed2 = board.getBreed2();
        this.gender = board.getGender();
        this.age = board.getAge();
        this.features = board.getFeatures();
        this.missingDate = board.getMissingDate();
        this.missingLocation = board.getMissingLocation();
        this.viewCount = board.getViewCount();
        this.createdAt = board.getCreatedAt();
        this.color = board.getColor();
        this.title = board.getTitle();
        this.likeCnt = likeCnt;
        this.isLiked = isLiked;

        //BoardImage 엔티티 리스트를 ImageResponse DTO 리스트로 변환
        if (board.getImages() != null) {
            this.images = board.getImages().stream()
                    .map(ImageResponse::new)
                    .collect(Collectors.toList());
        }
    }

    // 내부 클래스로 이미지 응답용 DTO 정의
    @Getter
    public static class ImageResponse {
        private String originalFileName;
        private String savedFileName;
        private String imgPath;

        public ImageResponse(BoardImage boardImage) {
            this.originalFileName = boardImage.getOriginalFileName();
            this.savedFileName = boardImage.getSavedFileName();
            this.imgPath = "/uploads/"+boardImage.getSavedFileName();

        }
    }
}