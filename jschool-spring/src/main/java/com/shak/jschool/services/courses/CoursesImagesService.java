package com.shak.jschool.services.courses;

import com.shak.jschool.api.exceptions.JException;
import com.shak.jschool.api.requests.CourseImagesRequest;
import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.CourseDto;
import com.shak.jschool.dtos.CourseImageDto;
import com.shak.jschool.entities.course.CourseEntity;
import com.shak.jschool.entities.course.CourseImageEntity;
import com.shak.jschool.repositories.CourseImageRepository;
import com.shak.jschool.repositories.CoursesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesImagesService {

    @Autowired
    CoursesRepository coursesRepository;

    @Autowired
    CourseImageRepository courseImageRepository;

    ModelMapper mapper;

    CoursesImagesService(){
        mapper = new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
    }

    public CourseEntity getCourseById(Long courseId){
        Optional<CourseEntity> optionalCourseEntity = coursesRepository.findById(courseId);
        if(optionalCourseEntity.isPresent() == false){
            throw new JException(HttpStatus.NOT_FOUND, "Course Id not found");
        }
        return optionalCourseEntity.get();
    }


    public List<CourseImageDto> getCourseImages(Long courseId){
        CourseEntity courseEntity = getCourseById(courseId);
        Iterable<CourseImageEntity> imageEntities = courseImageRepository.findAllByCourse(courseEntity);
        List<CourseImageDto> imagesDtos = new ArrayList<>();
        for(CourseImageEntity imageEntity: imageEntities){
            CourseImageDto courseImageDto = mapImageEntityToImageDto(imageEntity);
            imagesDtos.add(courseImageDto);
        }
        return imagesDtos;
    }

    public List<CourseImageDto> createAndReplaceCourseImage(CourseImagesRequest imagesRequest){
        Long courseId = imagesRequest.getCourseId();
        CourseEntity courseEntity = getCourseById(courseId);
        List<CourseImageDto> imageDtoList = mapImageRequestToImageDtoList(imagesRequest);
        if(courseId != null){
            this.deleteCourseImages(courseId);
        }
        for(CourseImageDto imageDto : imageDtoList){
            CourseImageEntity imageEntity = mapper.map(imageDto,CourseImageEntity.class);
            imageEntity.setCourse(courseEntity);
            courseImageRepository.save(imageEntity);
        }
        /*get course images */
        List<CourseImageDto> createdImages = getCourseImages(courseId);
        return createdImages;
    }

    public DeleteResponse deleteCourseImages(Long courseId){

        CourseEntity courseEntity = getCourseById(courseId);
        courseImageRepository.deleteAllByCourse(courseEntity);
        DeleteResponse deleteResponse = new DeleteResponse(DeleteStatus.SUCCESS, "Course Images successfully deleted");
        return deleteResponse;
    }

    private List<CourseImageDto> mapImageRequestToImageDtoList(CourseImagesRequest imagesRequest){
        List<CourseImageDto> imagesDtos = new ArrayList<>();
        Long courseId = imagesRequest.getCourseId();
        if(courseId == null){
            throw new JException(HttpStatus.NOT_FOUND, "Course Id not found");
        }
        for (String image : imagesRequest.getImages()){
            CourseImageDto currentImageDto = new CourseImageDto();
            currentImageDto.setCourseId(courseId);
            currentImageDto.setImage(image);
            imagesDtos.add(currentImageDto);
        }
        return imagesDtos;
    }

    public CourseImageDto mapImageEntityToImageDto(CourseImageEntity imageEntity){
        CourseImageDto imageDto = new CourseImageDto();
        imageDto.setId(imageEntity.getId());
        imageDto.setCourseId(imageEntity.getCourse().getId());
        imageDto.setImage(imageEntity.getImage());
        return imageDto;
    }
 }
