package com.example.springsocial.payload;

public class ApiResponse {
    private boolean success;
    private String message;

    public ApiResponse(final boolean success, final String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(final boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }
}
