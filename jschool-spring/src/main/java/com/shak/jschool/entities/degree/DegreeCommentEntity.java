package com.shak.jschool.entities.degree;

import com.shak.jschool.entities.UserEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class DegreeCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "degrees_id")
    private DegreeEntity degree;

    @ManyToOne(optional = false)
    @JoinColumn(name="users_id")
    private UserEntity user;

    @Column(length = 255)
    private String comment;

    @Column
    private Date date;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DegreeEntity getDegree() {
        return degree;
    }

    public void setDegree(DegreeEntity degree) {
        this.degree = degree;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
