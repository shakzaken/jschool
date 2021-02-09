package com.shak.jschool.controllers;


import com.shak.jschool.dtos.CourseDto;
import com.shak.jschool.services.CoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    CoursesService coursesService;

    @GetMapping(value = "/{id}")
    public CourseDto getCourseById(@PathVariable() Long id){
        return coursesService.getCourseById(id);
    }

    @PostMapping
    public CourseDto createCourse(@RequestBody CourseDto courseDto){
        CourseDto createdCourse = coursesService.createCourse(courseDto);
        return createdCourse;
    }
}
