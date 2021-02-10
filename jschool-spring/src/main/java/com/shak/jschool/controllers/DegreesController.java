package com.shak.jschool.controllers;


import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.dtos.DegreeDto;
import com.shak.jschool.repositories.DegreesRepository;
import com.shak.jschool.services.DegreesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/degrees")
public class DegreesController {

    @Autowired
    DegreesService degreesService;

    @GetMapping(value = "/{id}")
    public DegreeDto getDegreeById(@PathVariable Long id){
        DegreeDto degreeDto = degreesService.getDegreeById(id);
        return degreeDto;
    }

    @GetMapping()
    public List<DegreeDto> getAllDegrees(){
        List<DegreeDto> dtoList = degreesService.getAllDegrees();
        return dtoList;
    }

    @PostMapping()
    public DegreeDto createDegree(@RequestBody DegreeDto degreeDto){
        DegreeDto createdDegree = degreesService.createDegree(degreeDto);
        return createdDegree;
    }

    @PutMapping()
    public DegreeDto updateDegree(@RequestBody DegreeDto degreeDto){
        DegreeDto updatedDegree = degreesService.updateDegree(degreeDto);
        return updatedDegree;
    }

    @DeleteMapping(value = "/{id}")
    public DeleteResponse deleteDegree(@PathVariable Long id){
        DeleteResponse response = degreesService.deleteDegreeById(id);
        return response;
    }
}
