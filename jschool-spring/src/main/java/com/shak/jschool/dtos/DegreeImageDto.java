package com.shak.jschool.dtos;

import com.shak.jschool.entities.degree.DegreeEntity;



public class DegreeImageDto {

    private Long id;

    private String image;

    private DegreeEntity degree;

    private Long degreeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public DegreeEntity getDegree() {
        return degree;
    }

    public void setDegree(DegreeEntity degree) {
        this.degree = degree;
    }

    public Long getDegreeId() {
        return degreeId;
    }

    public void setDegreeId(Long degreeId) {
        this.degreeId = degreeId;
    }
}
