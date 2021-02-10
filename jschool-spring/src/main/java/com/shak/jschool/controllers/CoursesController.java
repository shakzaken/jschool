package com.shak.jschool.controllers;


import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.dtos.CourseDto;
import com.shak.jschool.services.CoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    CoursesService coursesService;

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
}
