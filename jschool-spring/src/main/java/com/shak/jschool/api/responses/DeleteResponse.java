package com.shak.jschool.api.responses;


public class DeleteResponse {
    private DeleteStatus status;
    private String message;


    public DeleteResponse(){

    }
    public DeleteResponse(DeleteStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public DeleteStatus getStatus() {
        return status;
    }

    public void setStatus(DeleteStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
