package com.shak.jschool.services;


import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.DegreeDto;
import com.shak.jschool.entities.DegreeEntity;
import com.shak.jschool.repositories.DegreesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import sun.net.www.http.HttpClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DegreesService {


    @Autowired
    DegreesRepository degreesRepository;

    ModelMapper modelMapper;

    DegreesService(){
        modelMapper = new ModelMapper();
    }

    public DegreeDto getDegreeById(Long id){
        Optional<DegreeEntity> optionalDegreeEntity = degreesRepository.findById(id);
        DegreeEntity degreeEntity = optionalDegreeEntity.get();
        if(degreeEntity == null){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Id is invalid");
        }
        DegreeDto degreeDto = modelMapper.map(degreeEntity,DegreeDto.class);
        return degreeDto;
    }

    public List<DegreeDto> getAllDegrees(){
        Iterable<DegreeEntity> entities = degreesRepository.findAll();
        List<DegreeDto> degreeDtos = new ArrayList<>();
        for(DegreeEntity entity : entities){
            degreeDtos.add(modelMapper.map(entity,DegreeDto.class));
        }
        return degreeDtos;
    }

    public DegreeDto createDegree(DegreeDto degreeDto){
        DegreeEntity degreeEntity = modelMapper.map(degreeDto,DegreeEntity.class);
        DegreeEntity createdDegreeEntity = degreesRepository.save(degreeEntity);
        DegreeDto createdDegreeDto = modelMapper.map(createdDegreeEntity,DegreeDto.class);
        return createdDegreeDto;
    }

    public DegreeDto updateDegree(DegreeDto degreeDto){
        Optional<DegreeEntity> optionalDegreeEntity = degreesRepository.findById(degreeDto.getId());
        DegreeEntity degreeEntity = optionalDegreeEntity.get();
        if(degreeEntity == null){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Degree not found");
        }
        degreeEntity.setName(degreeDto.getName());
        degreeEntity.setDescription(degreeDto.getDescription());
        DegreeEntity updatedDegreeEntity = this.degreesRepository.save(degreeEntity);
        DegreeDto updatedDegreeDto = modelMapper.map(updatedDegreeEntity,DegreeDto.class);
        return updatedDegreeDto;
    }

    public DeleteResponse deleteDegreeById(Long id){

        Optional<DegreeEntity> optionalDegreeEntity = degreesRepository.findById(id);
        DegreeEntity degreeEntity = optionalDegreeEntity.get();
        if(degreeEntity == null){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"Id is Invalid");
        }
        degreesRepository.delete(degreeEntity);

        DeleteResponse deleteResponse = new DeleteResponse(DeleteStatus.SUCCESS, "Degree Deleted Successfully");
        return deleteResponse;

    }


}
