package com.shak.jschool.api.requests;

import java.util.List;

public class DegreeImagesRequest {

    private Long degreeId;
    private List<String> images;

    public Long getDegreeId() {
        return degreeId;
    }

    public void setDegreeId(Long degreeId) {
        this.degreeId = degreeId;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}
