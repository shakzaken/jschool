package com.shak.jschool.repositories;

import com.shak.jschool.entities.course.CourseEntity;
import com.shak.jschool.entities.course.CourseImageEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseImageRepository extends CrudRepository<CourseImageEntity,Long> {

    public List<CourseImageEntity> findAllByCourse(CourseEntity courseEntity);
    public void deleteAllByCourse(CourseEntity courseEntity);
}
