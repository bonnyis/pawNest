package com.jihyeon.pawNest.dto.request.board;

import com.jihyeon.pawNest.domain.board.Board;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Schema(description = "게시글 등록 요청 객체")
public class BoardCreateRequest {
    @Schema(hidden = true)
    @Setter
    private String writerId;

    private String breed1;
    private String breed2;
    private String gender;
    private String age;
    private String color;
    private String title;
    private String features;
    private LocalDate missingDate; // YYYY-MM-DD 형식으로 받음
    private String missingLocation;

    public Board toEntity() {
        return Board.builder()
                .writerId(writerId).breed1(breed1).breed2(breed2).gender(gender)
                .age(age).features(features).missingDate(missingDate)
                .missingLocation(missingLocation).viewCount(0).color(color).title(title)
                .build();
    }
}