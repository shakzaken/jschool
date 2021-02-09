package com.shak.jschool.repositories;

import com.shak.jschool.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository  extends CrudRepository<UserEntity,Long> {

}
