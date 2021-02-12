package com.shak.jschool.repositories.degrees;


import com.shak.jschool.entities.degree.DegreeCommentEntity;
import com.shak.jschool.entities.degree.DegreeEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DegreesCommentsRepository extends CrudRepository<DegreeCommentEntity,Long> {
    public List<DegreeCommentEntity> findAllByDegree(DegreeEntity degreeEntity);
}
