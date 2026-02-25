package com.jihyeon.pawNest.dto.request.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Schema(description = "게시글 수정 요청 객체")
public class BoardUpdateRequest {

    @Schema(description = "품종1", example = "강아지")
    private String breed1;

    @Schema(description = "품종2", example = "말티즈")
    private String breed2;

    @Schema(description = "성별", example = "암컷")
    private String gender;

    @Schema(description = "나이", example = "3살 추정")
    private String age;

    @Schema(description = "색깔", example = "하얀색")
    private String color;

    @Schema(description = "특징", example = "오른쪽 귀에 점이 있고 사람을 잘 따릅니다.")
    private String features;

    @Schema(description = "실종 날짜", example = "2024-05-20")
    private LocalDate missingDate;

    @Schema(description = "실종 장소", example = "인천광역시 남동구 구월동")
    private String missingLocation;
}