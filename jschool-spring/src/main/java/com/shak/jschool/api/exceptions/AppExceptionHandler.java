package com.shak.jschool.api.exceptions;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value = {JException.class})
    public ResponseEntity<ExceptionResponse> handleJApiException(JException exception){

        ExceptionResponse exceptionResponse = new ExceptionResponse(exception.getStatus(),exception.getMessage());
        ResponseEntity<ExceptionResponse> response =
                new ResponseEntity<ExceptionResponse>(exceptionResponse,exceptionResponse.getStatus());
        return response;
    }
}
