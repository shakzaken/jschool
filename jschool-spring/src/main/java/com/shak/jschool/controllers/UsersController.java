package com.shak.jschool.controllers;

import com.shak.jschool.dtos.UserDto;
import com.shak.jschool.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    UsersService usersService;

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
}
