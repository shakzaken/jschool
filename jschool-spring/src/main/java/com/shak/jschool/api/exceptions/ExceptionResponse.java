package com.shak.jschool.api.exceptions;

import org.springframework.http.HttpStatus;

public class ExceptionResponse {

    HttpStatus status;
    String message;


    public ExceptionResponse() {
    }

    public ExceptionResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}