package com.shak.jschool.repositories;

import com.shak.jschool.entities.course.CourseCommentEntity;
import com.shak.jschool.entities.course.CourseEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseCommentRepository extends CrudRepository<CourseCommentEntity,Long> {
    public List<CourseCommentEntity> findAllByCourse(CourseEntity courseEntity);
}
