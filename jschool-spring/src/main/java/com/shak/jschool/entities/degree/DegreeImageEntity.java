package com.shak.jschool.entities.degree;

import javax.persistence.*;

@Entity
public class DegreeImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String image;

    @ManyToOne
    @JoinColumn(name="degrees_id")
    private DegreeEntity degree;

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
}
