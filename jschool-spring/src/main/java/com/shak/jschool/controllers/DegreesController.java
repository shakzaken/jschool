package com.shak.jschool.controllers;


import com.shak.jschool.api.requests.DegreeImagesRequest;
import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.dtos.DegreeCommentDto;
import com.shak.jschool.dtos.DegreeDto;
import com.shak.jschool.dtos.DegreeImageDto;
import com.shak.jschool.services.degrees.DegreesCommentsService;
import com.shak.jschool.services.degrees.DegreesImagesService;
import com.shak.jschool.services.degrees.DegreesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/degrees")
public class DegreesController {

    @Autowired
    DegreesService degreesService;

    @Autowired
    DegreesCommentsService degreesCommentsService;

    @Autowired
    DegreesImagesService degreesImagesService;

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

    /*--- Degree Comments --- */

    @GetMapping("/{degreeId}/comments")
    public List<DegreeCommentDto> getCommentsByDegreeId(@PathVariable Long degreeId){
        List<DegreeCommentDto> comments = degreesCommentsService.getCommentsByDegreeId(degreeId);
        return comments;
    }

    @PostMapping("/comments")
    public DegreeCommentDto createDegreeComment(@RequestBody DegreeCommentDto degreeDto){
        DegreeCommentDto createdComment = degreesCommentsService.createComment(degreeDto);
        return createdComment;
    }

    @DeleteMapping("/comments/{commentId}")
    public DeleteResponse deleteDegreeComment(@PathVariable Long commentId){
        DeleteResponse response = degreesCommentsService.deleteComment(commentId);
        return response;
    }

    /*----- Degree Images -----*/

    @GetMapping("/{degreeId}/images")
    public List<DegreeImageDto> getDegreeImages(@PathVariable Long degreeId){
        List<DegreeImageDto> imageDtos = degreesImagesService.getAllDegreeImages(degreeId);
        return imageDtos;
    }

    @PostMapping("/images")
    public List<DegreeImageDto> createOrReplaceDegreeImages(@RequestBody DegreeImagesRequest request){
        List<DegreeImageDto> imageDtos = degreesImagesService.createOrReplaceDegreeImages(request);
        return imageDtos;
    }
}
