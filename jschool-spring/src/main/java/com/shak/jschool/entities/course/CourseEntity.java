package com.shak.jschool.entities.course;


import javax.persistence.*;
import java.util.List;

@Entity(name = "courses")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @OneToMany(mappedBy = "course",fetch = FetchType.LAZY)
    List<CourseCommentEntity> courseComments;

    @OneToMany(mappedBy = "course",fetch = FetchType.LAZY)
    List<CourseImageEntity> courseImages;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
