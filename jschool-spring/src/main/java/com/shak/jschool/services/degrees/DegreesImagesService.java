package com.shak.jschool.services.degrees;

import com.shak.jschool.api.exceptions.JException;
import com.shak.jschool.api.requests.DegreeImagesRequest;
import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.DegreeDto;
import com.shak.jschool.dtos.DegreeImageDto;
import com.shak.jschool.entities.degree.DegreeEntity;
import com.shak.jschool.entities.degree.DegreeImageEntity;
import com.shak.jschool.repositories.degrees.DegreeImageRepository;
import com.shak.jschool.repositories.degrees.DegreesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DegreesImagesService {

    @Autowired
    private DegreesRepository degreesRepository;

    @Autowired
    private DegreeImageRepository degreeImageRepository;

    private ModelMapper mapper;

    DegreesImagesService(){
        mapper = new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
    }

    public DegreeEntity getDegreeById(Long degreeId){
        Optional<DegreeEntity> optionalDegreeEntity = degreesRepository.findById(degreeId);
        if(optionalDegreeEntity.isPresent() == false){
            throw new JException(HttpStatus.BAD_REQUEST,"Degree Id is invalid");
        }
        return optionalDegreeEntity.get();
    }

    public DeleteResponse deleteDegreeImages(Long degreeId){
        DegreeEntity degreeEntity = this.getDegreeById(degreeId);
        this.degreeImageRepository.deleteAllByDegree(degreeEntity);
        DeleteResponse response = new DeleteResponse(DeleteStatus.SUCCESS,"Images deleted successfully");
        return response;
    }

    @Transactional
    public List<DegreeImageDto> createOrReplaceDegreeImages(DegreeImagesRequest imagesRequest){
        Long degreeId = imagesRequest.getDegreeId();
        deleteDegreeImages(degreeId);
        List<DegreeImageEntity> imageEntities = mapImageRequestToImageEntityList(imagesRequest);
        degreeImageRepository.saveAll(imageEntities);
        return getAllDegreeImages(degreeId);
    }

    public List<DegreeImageDto> getAllDegreeImages(Long degreeId){
        DegreeEntity degreeEntity = this.getDegreeById(degreeId);
        List<DegreeImageEntity> imagesEntities = degreeImageRepository.findAllByDegree(degreeEntity);
        List<DegreeImageDto> imageDtos = new ArrayList<>();
        for(DegreeImageEntity imageEntity : imagesEntities){
            imageDtos.add(mapper.map(imageEntity,DegreeImageDto.class));
        }
        return imageDtos;
    }

    private List<DegreeImageEntity> mapImageRequestToImageEntityList(DegreeImagesRequest imagesRequest){
        List<DegreeImageEntity> imageEntities = new ArrayList<>();
        DegreeEntity degreeEntity = getDegreeById(imagesRequest.getDegreeId());
        for(String image : imagesRequest.getImages()){
            DegreeImageEntity imageEntity = new DegreeImageEntity();
            imageEntity.setImage(image);
            imageEntity.setDegree(degreeEntity);
            imageEntities.add(imageEntity);
        }
        return imageEntities;
    }
}
