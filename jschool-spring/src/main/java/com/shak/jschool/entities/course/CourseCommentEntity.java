package com.shak.jschool.entities.course;

import com.shak.jschool.entities.UserEntity;

import javax.persistence.*;

import java.util.Date;

@Entity
public class CourseCommentEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne(optional = false)
    @JoinColumn(name ="courses_id")
    private CourseEntity course;

    @ManyToOne(optional = false)
    @JoinColumn(name = "users_id")
    private UserEntity user;

    @Column()
    private String comment;

    @Column
    private Date date;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CourseEntity getCourseEntity() {
        return course;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.course = courseEntity;
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
