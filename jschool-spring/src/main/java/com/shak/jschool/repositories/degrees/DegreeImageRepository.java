package com.shak.jschool.repositories.degrees;


import com.shak.jschool.entities.degree.DegreeEntity;
import com.shak.jschool.entities.degree.DegreeImageEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DegreeImageRepository extends CrudRepository<DegreeImageEntity,Long> {

    public List<DegreeImageEntity> findAllByDegree(DegreeEntity degreeEntity);
    @Transactional
    public void deleteAllByDegree(DegreeEntity degreeEntity);
}
