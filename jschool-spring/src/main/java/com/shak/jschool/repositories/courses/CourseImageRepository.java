package com.shak.jschool.repositories.courses;

import com.shak.jschool.entities.course.CourseEntity;
import com.shak.jschool.entities.course.CourseImageEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CourseImageRepository extends CrudRepository<CourseImageEntity,Long> {

    public List<CourseImageEntity> findAllByCourse(CourseEntity courseEntity);
    @Transactional
    public void deleteAllByCourse(CourseEntity courseEntity);
}
