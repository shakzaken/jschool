package com.shak.jschool.services;

import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.api.responses.DeleteStatus;
import com.shak.jschool.dtos.UserDto;
import com.shak.jschool.entities.UserEntity;
import com.shak.jschool.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    ModelMapper modelMapper;

    UsersService(){
        modelMapper = new ModelMapper();
    }

    public List<UserDto> getAllUsers(){
        Iterable<UserEntity> userEntities = usersRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for(UserEntity entity : userEntities){
            userDtos.add(modelMapper.map(entity,UserDto.class));
        }
        return userDtos;
    }

    public UserDto getUserById(Long id){

        Optional<UserEntity> optionalUserEntity = usersRepository.findById(id);
        UserEntity userEntity = optionalUserEntity.get();
        UserDto userDto = modelMapper.map(userEntity,UserDto.class);
        return userDto;
    }

    public UserDto createUser(UserDto userDto){

        UserEntity userEntity = modelMapper.map(userDto,UserEntity.class);
        UserEntity createdUserEntity = usersRepository.save(userEntity);
        UserDto createdUser = modelMapper.map(createdUserEntity,UserDto.class);
        return createdUser;
    }

    /* No password update */

    public UserDto updateUser(UserDto userDto){
        Optional<UserEntity> optionalUserEntity = usersRepository.findById(userDto.getId());
        UserEntity userEntity = optionalUserEntity.get();
        userEntity.setEmail(userDto.getEmail());
        userEntity.setName(userDto.getName());
        UserEntity updatedUserEntity = usersRepository.save(userEntity);
        UserDto updatedUserDto = modelMapper.map(updatedUserEntity,UserDto.class);
        return updatedUserDto;
    }

    public DeleteResponse deleteUser(Long id){
        Optional<UserEntity> optionalUserEntity = usersRepository.findById(id);
        UserEntity userEntity = optionalUserEntity.get();
        if(userEntity == null){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"User not found");
        }
        usersRepository.delete(userEntity);
        DeleteResponse response = new DeleteResponse(DeleteStatus.SUCCESS,"User deleted successfully");
        return response;
    }
}
