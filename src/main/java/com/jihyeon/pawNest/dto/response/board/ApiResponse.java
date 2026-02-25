package com.jihyeon.pawNest.dto.response.board;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;   // 성공 여부
    private String message;    // 전달할 메시지
    private T data;            // 실제 데이터 (ID나 목록 등)

    // 성공 응답을 위한 정적 팩토리 메서드
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(true, message,null);
    }

    // 실패 응답을 위한 정적 팩토리 메서드
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}