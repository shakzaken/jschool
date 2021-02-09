package com.shak.jschool.services;

import com.shak.jschool.dtos.UserDto;
import com.shak.jschool.entities.UserEntity;
import com.shak.jschool.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public UserDto getUserById(Long id){
        ModelMapper modelMapper = new ModelMapper();

        Optional<UserEntity> optionalUserEntity = usersRepository.findById(id);
        UserEntity userEntity = optionalUserEntity.get();
        UserDto userDto = modelMapper.map(userEntity,UserDto.class);
        return userDto;
    }

    public UserDto createUser(UserDto userDto){
        ModelMapper modelMapper = new ModelMapper();

        UserEntity userEntity = modelMapper.map(userDto,UserEntity.class);
        UserEntity createdUserEntity = usersRepository.save(userEntity);

        UserDto createdUser = modelMapper.map(createdUserEntity,UserDto.class);
        return createdUser;
    }
}
