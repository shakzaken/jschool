package com.shak.jschool.services.degrees;

import com.shak.jschool.api.exceptions.JException;
import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.DegreeCommentDto;
import com.shak.jschool.entities.UserEntity;
import com.shak.jschool.entities.degree.DegreeCommentEntity;
import com.shak.jschool.entities.degree.DegreeEntity;
import com.shak.jschool.repositories.degrees.DegreesCommentsRepository;
import com.shak.jschool.repositories.degrees.DegreesRepository;
import com.shak.jschool.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DegreesCommentsService {


    @Autowired
    DegreesCommentsRepository degreesCommentsRepository;

    @Autowired
    DegreesRepository degreesRepository;

    @Autowired
    UsersRepository usersRepository;

    ModelMapper mapper;

    DegreesCommentsService(){
        mapper = new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);

    }



    public DegreeCommentDto createComment(DegreeCommentDto commentDto) {

        Optional<UserEntity> optionalUserEntity = usersRepository.findById(commentDto.getUserId());
        if (optionalUserEntity.isPresent() == false) {
            throw new JException(HttpStatus.BAD_REQUEST, "User Id is invalid");
        }
        Optional<DegreeEntity> optionalDegreeEntity = degreesRepository.findById(commentDto.getDegreeId());
        if (optionalDegreeEntity.isPresent() == false) {
            throw new JException(HttpStatus.BAD_REQUEST, "Degree Id is Invalid");
        }

        DegreeCommentEntity commentEntity = mapper.map(commentDto,DegreeCommentEntity.class);

        commentEntity.setUser(optionalUserEntity.get());
        commentEntity.setDegree(optionalDegreeEntity.get());
        Date date = new Date();
        commentEntity.setDate(date);

        DegreeCommentEntity savedCommentEntity = degreesCommentsRepository.save(commentEntity);

        DegreeCommentDto savedCommentDto = mapper.map(savedCommentEntity,DegreeCommentDto.class);

        return savedCommentDto;
    }

    public List<DegreeCommentDto> getCommentsByDegreeId(Long degreeId){

        Optional<DegreeEntity> optionalDegreeEntity = degreesRepository.findById(degreeId);
        if (optionalDegreeEntity.isPresent() == false) {
            throw new JException(HttpStatus.BAD_REQUEST, "Degree Id is Invalid");
        }
        List<DegreeCommentEntity> commentsEntities = degreesCommentsRepository.findAllByDegree(optionalDegreeEntity.get());
        List<DegreeCommentDto> commentDtos = new ArrayList<>();
        for(DegreeCommentEntity commentEntity : commentsEntities){
            commentDtos.add(mapper.map(commentEntity,DegreeCommentDto.class));
        }
        return commentDtos;
    }

    public DeleteResponse deleteComment(Long commentId){
        Optional<DegreeCommentEntity> optionalComment = degreesCommentsRepository.findById(commentId);
        if(optionalComment.isPresent() == false){
            throw new JException(HttpStatus.NOT_FOUND,"Comment Id is Invalid");
        }
        degreesCommentsRepository.delete(optionalComment.get());
        DeleteResponse response = new DeleteResponse(DeleteStatus.SUCCESS,"Comment deleted successfully");
        return response;

    }


}
