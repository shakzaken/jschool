package com.shak.jschool.api.requests;

import java.util.List;

public class CourseImagesRequest {

    private Long courseId;
    private List<String> images;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}
