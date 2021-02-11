package com.shak.jschool.controllers;


import com.shak.jschool.api.requests.CourseImagesRequest;
import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.dtos.CourseCommentDto;
import com.shak.jschool.dtos.CourseDto;
import com.shak.jschool.dtos.CourseImageDto;
import com.shak.jschool.services.courses.CoursesCommentsService;
import com.shak.jschool.services.courses.CoursesImagesService;
import com.shak.jschool.services.courses.CoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    CoursesService coursesService;

    @Autowired
    CoursesCommentsService coursesCommentsService;

    @Autowired
    CoursesImagesService coursesImagesService;

    @GetMapping
    public List<CourseDto> getAllCourses(){
        List<CourseDto> courseDtos = coursesService.getAllCourses();
        return courseDtos;
    }

    @GetMapping(value = "/{id}")
    public CourseDto getCourseById(@PathVariable() Long id){
        return coursesService.getCourseById(id);
    }

    @PostMapping
    public CourseDto createCourse(@RequestBody CourseDto courseDto){
        CourseDto createdCourse = coursesService.createCourse(courseDto);
        return createdCourse;
    }

    @PutMapping
    public CourseDto updateCourse(@RequestBody CourseDto courseDto){
        CourseDto updatedCourse = coursesService.updateCourse(courseDto);
        return updatedCourse;
    }

    @DeleteMapping("/{id}")
    public DeleteResponse deleteCourse(@PathVariable Long id){
        DeleteResponse response = coursesService.deleteCourse(id);
        return response;
    }

    /*------- Course Comments ---------- */

    @GetMapping("/{courseId}/comments")
    public List<CourseCommentDto> getCourseComments(@PathVariable Long courseId){
        List<CourseCommentDto> commentDtos = coursesCommentsService.getCommentsByCourseId(courseId);
        return commentDtos;
    }

    @PostMapping("/comments")
    public CourseCommentDto createCourseComment(@RequestBody CourseCommentDto commentDto){
        CourseCommentDto createdComment = coursesCommentsService.createComment(commentDto);
        return createdComment;
    }

    @DeleteMapping("/comments/{commentId}")
    public DeleteResponse deleteComment(@PathVariable Long commentId){
        DeleteResponse response = coursesCommentsService.deleteComment(commentId);
        return response;
    }


    /* -------- Course images ------------ */

    @GetMapping("/{courseId}/images")
    public List<CourseImageDto> getCourseImages(@PathVariable Long courseId){
        List<CourseImageDto> courseImageDtos = coursesImagesService.getCourseImages(courseId);
        return courseImageDtos;
    }

    @PostMapping("/images")
    public List<CourseImageDto> createOrReplaceCourseImages(@RequestBody CourseImagesRequest imagesRequest){
        List<CourseImageDto> courseImageDtos = coursesImagesService.createAndReplaceCourseImage(imagesRequest);
        return courseImageDtos;
    }

}
