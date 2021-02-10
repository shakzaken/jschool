package com.shak.jschool.services;


import com.shak.jschool.dtos.CourseDto;
import com.shak.jschool.entities.CourseEntity;
import com.shak.jschool.repositories.CoursesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;

@Service
public class CoursesService {

    @Autowired
    CoursesRepository coursesRepository;


    public CourseDto createCourse(CourseDto courseDto){

        ModelMapper mapper = new ModelMapper();
        CourseEntity courseEntity = mapper.map(courseDto,CourseEntity.class);
        CourseEntity createdCourseEntity = coursesRepository.save(courseEntity);
        CourseDto createdCourse = mapper.map(createdCourseEntity,CourseDto.class);
        return createdCourse;
    }

    public CourseDto getCourseById(Long id){
        ModelMapper mapper = new ModelMapper();
        Optional<CourseEntity> optionalCourseEntity = coursesRepository.findById(id);
        CourseEntity courseEntity = optionalCourseEntity.get();
        if(courseEntity == null)
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Course id not found");
        CourseDto courseDto = mapper.map(courseEntity,CourseDto.class);
        return courseDto;
    }

}
