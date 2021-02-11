package com.shak.jschool.services.courses;


import com.shak.jschool.api.exceptions.JException;
import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.CourseCommentDto;
import com.shak.jschool.entities.UserEntity;
import com.shak.jschool.entities.course.CourseCommentEntity;
import com.shak.jschool.entities.course.CourseEntity;
import com.shak.jschool.repositories.CourseCommentRepository;
import com.shak.jschool.repositories.CoursesRepository;
import com.shak.jschool.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesCommentsService {


    @Autowired
    CourseCommentRepository courseCommentRepository;

    @Autowired
    CoursesRepository coursesRepository;

    @Autowired
    UsersRepository usersRepository;

    ModelMapper mapper;

    CoursesCommentsService(){
        mapper = new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
    }

    public CourseCommentDto createComment(CourseCommentDto commentDto){
        CourseCommentEntity commentEntity = mapper.map(commentDto,CourseCommentEntity.class);
        Date date = new Date();
        commentEntity.setDate(date);
        Optional<CourseEntity> optionalCourseEntity = coursesRepository.findById(commentDto.getCourseId());
        if(optionalCourseEntity.isPresent() == false){
            throw new JException(HttpStatus.BAD_REQUEST,"Course Id not found");
        }
        Optional<UserEntity> optionalUserEntity  = usersRepository.findById(commentDto.getUserId());
        if(optionalUserEntity.isPresent() == false){
            throw new JException(HttpStatus.BAD_REQUEST,"User is not found");
        }
        commentEntity.setUser(optionalUserEntity.get());
        commentEntity.setCourseEntity(optionalCourseEntity.get());
        CourseCommentEntity saveCommentEntity = courseCommentRepository.save(commentEntity);
        CourseCommentDto savedCommentDto = mapper.map(saveCommentEntity,CourseCommentDto.class);
        return savedCommentDto;
    }

    public List<CourseCommentDto> getCommentsByCourseId(Long courseId){

        CourseEntity courseEntity = coursesRepository.findById(courseId).get();
        List<CourseCommentEntity> commentEntities = courseCommentRepository.findAllByCourse(courseEntity);

        List<CourseCommentDto> commentsDtos = new ArrayList<>();
        for(CourseCommentEntity commentEntity : commentEntities){
            commentsDtos.add(mapper.map(commentEntity,CourseCommentDto.class));
        }
        return commentsDtos;
    }

    public DeleteResponse deleteComment(Long id){
        CourseCommentEntity commentEntity = courseCommentRepository.findById(id).get();
        if(commentEntity == null){
            throw new JException(HttpStatus.NOT_FOUND,"Comment id not found");
        }
        courseCommentRepository.delete(commentEntity);
        DeleteResponse response = new DeleteResponse(DeleteStatus.SUCCESS,"Comment deleted successfully");
        return response;
    }
}
