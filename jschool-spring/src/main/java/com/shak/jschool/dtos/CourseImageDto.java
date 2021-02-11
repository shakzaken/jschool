package com.shak.jschool.dtos;

import com.shak.jschool.entities.course.CourseEntity;

import javax.persistence.*;

public class CourseImageDto {


    private Long id;
    private Long courseId;
    private CourseEntity course;
    private String image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
