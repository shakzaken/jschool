package com.shak.jschool.repositories;

import com.shak.jschool.entities.course.CourseEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursesRepository extends CrudRepository<CourseEntity,Long> {


}
