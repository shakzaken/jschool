package com.shak.jschool.services;


import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.CourseDto;
import com.shak.jschool.entities.CourseEntity;
import com.shak.jschool.repositories.CoursesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesService {

    @Autowired
    CoursesRepository coursesRepository;

    ModelMapper mapper;

    CoursesService(){
        mapper = new ModelMapper();
    }


    public List<CourseDto> getAllCourses(){
        Iterable<CourseEntity> courseEntities = coursesRepository.findAll();
        List<CourseDto> courseDtos = new ArrayList<>();
        for(CourseEntity entity : courseEntities){
            courseDtos.add(mapper.map(entity,CourseDto.class));
        }
        return courseDtos;
    }

    public CourseDto getCourseById(Long id){
        Optional<CourseEntity> optionalCourseEntity = coursesRepository.findById(id);
        CourseEntity courseEntity = optionalCourseEntity.get();
        if(courseEntity == null)
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Course id not found");
        CourseDto courseDto = mapper.map(courseEntity,CourseDto.class);
        return courseDto;
    }

    public CourseDto createCourse(CourseDto courseDto){

        CourseEntity courseEntity = mapper.map(courseDto,CourseEntity.class);
        CourseEntity createdCourseEntity = coursesRepository.save(courseEntity);
        CourseDto createdCourse = mapper.map(createdCourseEntity,CourseDto.class);
        return createdCourse;
    }

    public CourseDto updateCourse(CourseDto courseDto){
        Optional<CourseEntity> optionalCourseEntity = coursesRepository.findById(courseDto.getId());
        CourseEntity courseEntity = optionalCourseEntity.get();
        if(courseEntity == null){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Course not found");
        }
        courseEntity.setName(courseDto.getName());
        courseEntity.setDescription(courseDto.getDescription());
        CourseEntity savedCourseEntity = coursesRepository.save(courseEntity);
        CourseDto savedCourseDto = mapper.map(savedCourseEntity,CourseDto.class);
        return savedCourseDto;
    }

    public DeleteResponse deleteCourse(Long id){
        Optional<CourseEntity> optionalCourseEntity = coursesRepository.findById(id);
        CourseEntity courseEntity = optionalCourseEntity.get();
        if(courseEntity == null){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Course id not found");
        }
        coursesRepository.delete(courseEntity);
        DeleteResponse response = new DeleteResponse(DeleteStatus.SUCCESS,"Course deleted successfully");
        return response;
    }

}
