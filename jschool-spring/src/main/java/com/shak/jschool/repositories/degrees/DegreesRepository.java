package com.shak.jschool.repositories.degrees;

import com.shak.jschool.entities.degree.DegreeEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreesRepository extends CrudRepository<DegreeEntity,Long> {

}
