package com.shak.jschool.controllers;

import com.shak.jschool.api.responses.DeleteResponse;
import com.shak.jschool.dtos.UserDto;
import com.shak.jschool.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    UsersService usersService;

    @GetMapping
    public List<UserDto> getAllUsers(){
        List<UserDto> userDtos = usersService.getAllUsers();
        return userDtos;
    }

    @GetMapping(value = "/{id}")
    public UserDto getUserById(@PathVariable Long id){
        UserDto userDto = usersService.getUserById(id);
        return userDto;
    }

    @PostMapping()
    public UserDto createUser(@RequestBody() UserDto userDto){

        UserDto createdUser = usersService.createUser(userDto);
        return createdUser;
    }

    @PutMapping
    public UserDto updateUser(@RequestBody() UserDto userDto){
        UserDto updatedUser = usersService.updateUser(userDto);
        return updatedUser;
    }

    @DeleteMapping("/{id}")
    public DeleteResponse deleteUser(@PathVariable Long id){
        DeleteResponse response = usersService.deleteUser(id);
        return response;
    }
}
